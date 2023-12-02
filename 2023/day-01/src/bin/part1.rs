fn main() {
    let input: &str = include_str!("./input1.txt");
    let output = part1(input);
    dbg!(output);
}

fn part1(input: &str) -> String {
    let mut sum = 0;

    for line in input.lines() {
        let trimmed: &str = line.trim();
        let first_numeric: Option<char> = trimmed.chars().find(|c| c.is_numeric());
        let last_numeric: Option<char> = trimmed.chars().rev().find(|c| c.is_numeric());
        let combined: String = match (first_numeric, last_numeric) {
            (Some(first), Some(last)) => vec![first, last].into_iter().collect(),
            _ => String::new(),
        };

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
            "1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet",
        );
        assert_eq!(result, "142")
    }
}
