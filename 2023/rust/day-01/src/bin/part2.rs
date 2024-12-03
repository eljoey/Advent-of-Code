fn main() {
    let input: &str = include_str!("./input1.txt");
    let output = part1(input);
    dbg!(output);
}

fn find_number_str(input_string: &str) -> String {
    let word_to_digit: Vec<(&str, &str)> = vec![
        ("one", "1"),
        ("two", "2"),
        ("three", "3"),
        ("four", "4"),
        ("five", "5"),
        ("six", "6"),
        ("seven", "7"),
        ("eight", "8"),
        ("nine", "9"),
    ];

    let mut result = String::new();
    let mut current_word = String::new();
    let mut index = 0;
    let mut index2 = 1;
    let mut cont = true;

    while index < input_string.len() {
        if let Some(c) = input_string.chars().nth(index) {
            if c.is_numeric() {
                result.push(c);
                current_word.clear();
                cont = false
            } else {
                current_word.push(c)
            }
        }

        while cont {
            while index2 < input_string.len() {
                if let Some(c) = input_string.chars().nth(index2) {
                    if c.is_alphabetic() {
                        current_word.push(c);
                        if let Some(digit) = word_to_digit
                            .iter()
                            .find(|&&(word, _)| word == current_word)
                        {
                            result.push_str(digit.1);
                            current_word.clear();
                            break;
                        } else {
                            index2 += 1
                        }
                    } else {
                        break;
                    }
                }
            }
            current_word.clear();
            break;
        }
        index += 1;
        index2 = index + 1;
        cont = true
    }

    return result;
}

fn get_number(input: &str) -> String {
    let trimmed: &str = input.trim();
    let first_numeric: Option<char> = trimmed.chars().find(|c| c.is_numeric());
    let last_numeric: Option<char> = trimmed.chars().rev().find(|c| c.is_numeric());
    let combined: String = match (first_numeric, last_numeric) {
        (Some(first), Some(last)) => vec![first, last].into_iter().collect(),
        _ => String::new(),
    };
    return combined;
}

fn part1(input: &str) -> String {
    let mut sum = 0;

    for line in input.lines() {
        let trimmed: &str = line.trim();
        let replaced: String = find_number_str(&trimmed);
        let combined: String = get_number(&replaced);

        let parsed = combined.parse().unwrap_or(0);
        sum += parsed
    }

    return sum.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = part1(
            "two1nine
            eightwothree
            abcone2threexyz
            xtwone3four
            4nineeightseven2
            zoneight234
            7pqrstsixteen",
        );
        assert_eq!(result, "281")
    }
}
