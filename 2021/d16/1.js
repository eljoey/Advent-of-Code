const fs = require("fs");

const input = '00569F4A0488043262D30B333FCE6938EC5E5228F2C78A017CD78C269921249F2C69256C559CC01083BA00A4C5730FF12A56B1C49A480283C0055A532CF2996197653005FC01093BC4CE6F5AE49E27A7532200AB25A653800A8CAE5DE572EC40080CD26CA01CAD578803CBB004E67C573F000958CAF5FC6D59BC8803D1967E0953C68401034A24CB3ACD934E311004C5A00A4AB9CAE99E52648401F5CC4E91B6C76801F59DA63C1F3B4C78298014F91BCA1BAA9CBA99006093BFF916802923D8CC7A7A09CA010CD62DF8C2439332A58BA1E495A5B8FA846C00814A511A0B9004C52F9EF41EC0128BF306E4021FD005CD23E8D7F393F48FA35FCE4F53191920096674F66D1215C98C49850803A600D4468790748010F8430A60E1002150B20C4273005F8012D95EC09E2A4E4AF7041004A7F2FB3FCDFA93E4578C0099C52201166C01600042E1444F8FA00087C178AF15E179802F377EC695C6B7213F005267E3D33F189ABD2B46B30042655F0035300042A0F47B87A200EC1E84306C801819B45917F9B29700AA66BDC7656A0C49DB7CAEF726C9CEC71EC5F8BB2F2F37C9C743A600A442B004A7D2279125B73127009218C97A73C4D1E6EF64A9EFDE5AF4241F3FA94278E0D9005A32D9C0DD002AB2B7C69B23CCF5B6C280094CE12CDD4D0803CF9F96D1F4012929DA895290FF6F5E2A9009F33D796063803551006E3941A8340008743B8D90ACC015C00DDC0010B873052320002130563A4359CF968000B10258024C8DF2783F9AD6356FB6280312EBB394AC6FE9014AF2F8C381008CB600880021B0AA28463100762FC1983122D2A005CBD11A4F7B9DADFD110805B2E012B1F4249129DA184768912D90B2013A4001098391661E8803D05612C731007216C768566007280126005101656E0062013D64049F10111E6006100E90E004100C1620048009900020E0006DA0015C000418000AF80015B3D938';

class Packet {
    constructor({ version, typeId }) {
        this.version = version;
        this.typeId = typeId;
        this.packets = [];
    }
}

/**
 * take a binary string, return a list of packets
 */
function parsePackets(input, totalSubpackets = -1) {
    const packets = [];
    let totalPackets = 0;
    const startInputSize = input.length;
    while (
        input.length > 0 &&
        (totalSubpackets < 0 || totalPackets < totalSubpackets)
    ) {
        if (/^0+$/.test(input)) {
            // Only zeros, most likely due to padding
            break;
        }
        const version = parseInt(input.substring(0, 3), 2);
        const typeId = parseInt(input.substring(3, 6), 2);
        const packet = new Packet({
            version,
            typeId,
        });
        totalPackets++;
        input = input.substring(6);

        // literal
        if (typeId === 4) {
            let binaryString = "";
            while (input[0] === "1") {
                binaryString += input.substring(1, 5);
                input = input.substring(5);
            }
            binaryString += input.substring(1, 5);
            input = input.substring(5);
            packet.value = parseInt(binaryString, 2);
        } else {
            const lengthTypeId = input[0];
            input = input.substring(1);
            if (lengthTypeId === "0") {
                const length = parseInt(input.substring(0, 15), 2);
                input = input.substring(15);

                const subpackets = input.substring(0, length);
                packet.packets = parsePackets(subpackets);
                input = input.substring(length);
            } else {
                const totalSubPackets = parseInt(input.substring(0, 11), 2);
                input = input.substring(11);

                packet.packets = parsePackets(input, totalSubPackets);
                input = input.substring(packet.packets.consumed);
                delete packet.packets.consumed;
            }

            //we have the list of subpackets, we can act on it
            switch (typeId) {
                case 0: // sum
                    packet.value = packet.packets.reduce((a, b) => a + b.value, 0);
                    break;
                case 1: // product
                    packet.value = packet.packets.reduce((a, b) => a * b.value, 1);
                    break;
                case 2: // min
                    packet.value = Math.min(...packet.packets.map((p) => p.value));
                    break;
                case 3: // max
                    packet.value = Math.max(...packet.packets.map((p) => p.value));
                    break;
                case 5: //greater than
                    packet.value = Number(
                        packet.packets[0].value > packet.packets[1].value
                    );
                    break;
                case 6: //lower than
                    packet.value = Number(
                        packet.packets[0].value < packet.packets[1].value
                    );
                    break;
                case 7: //equal to
                    packet.value = Number(
                        packet.packets[0].value === packet.packets[1].value
                    );
                    break;
                default:
                    break;
            }
        }
        packets.push(packet);
    }
    packets.consumed = startInputSize - input.length;
    return packets;
}

function sumVersions(packets) {
    return packets
        .map((p) => p.version + sumVersions(p.packets))
        .reduce((a, b) => a + b, 0);
}

function hexToBinary(hex) {
    return [...hex].map((n) => parseInt(n, 16).toString(2).padStart(4, "0"))
        .join``;
}

function part1(input) {
    const binary = hexToBinary(input);
    const packets = parsePackets(binary);

    // console.log(JSON.stringify(packets, null, 2));

    return sumVersions(packets);
}

function assertEqual(a, b) {
    if (a === b) {
        console.log("🎉 Yay", a, b);
    } else {
        console.log("😭 Oops", a, b);
    }
}

// assertEqual(part1("D2FE28"), 6);
// assertEqual(part1("38006F45291200"), 9);
// assertEqual(part1("8A004A801A8002F478"), 16);
// assertEqual(part1("620080001611562C8802118E34"), 12);
// assertEqual(part1("C0015000016115A2E0802F182340"), 23);
// assertEqual(part1("A0016C880162017C3686B18A3D4780"), 31);

console.log(part1(input));

function part2(input) {
    const binary = hexToBinary(input);
    const packets = parsePackets(binary);

    return packets[0].value;
}

// assertEqual(part2("C200B40A82"), 3);
// assertEqual(part2("04005AC33890"), 54);
// assertEqual(part2("880086C3E88112"), 7);
// assertEqual(part2("CE00C43D881120"), 9);
// assertEqual(part2("D8005AC2A8F0"), 1);
// assertEqual(part2("F600BC2D8F"), 0);
// assertEqual(part2("9C005AC2F8F0"), 0);
// assertEqual(part2("9C0141080250320F1802104A08"), 1);

console.log(part2(input));