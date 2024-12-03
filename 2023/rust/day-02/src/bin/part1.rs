use std::collections::HashMap;

fn main() {
    let input: &str = include_str!("./input1.txt");
    let output = part1(input);
    dbg!(output);
}

fn game_check(game: &str) -> bool {
    let mut color_values = HashMap::new();
    color_values.insert(String::from("red"), 12);
    color_values.insert(String::from("green"), 13);
    color_values.insert(String::from("blue"), 14);

    for segment in game.split(",") {
        let parts: Vec<&str> = segment.trim().split_whitespace().collect();

        if parts.len() == 2 {
            let count: i32 = parts[0].parse().unwrap_or(0);
            let color = parts[1].to_lowercase();

            // Convert color to String when using it as a key
            if let Some(&value) = color_values.get(color.as_str()) {
                if count > value {
                    return false;
                }
            }
        }
    }

    return true;
}

fn part1(input: &str) -> String {
    let mut sum = 0;

    for line in input.lines() {
        let trimmed: &str = line.trim();
        let game: Vec<String> = trimmed
            .replace("Game ", "")
            .split(':')
            .map(String::from)
            .collect();
        let mut game_no = String::new();
        let mut games = String::new();

        for (index, item) in game.iter().enumerate() {
            if index == 0 {
                game_no = item.to_string();
            } else {
                games = item.to_string();
                let split_games = games.split(";");
                let mut all_valid = true;

                for game in split_games.into_iter() {
                    let valid = game_check(game);

                    if valid == false {
                        all_valid = false
                    }
                }

                if all_valid {
                    sum += game_no.parse().unwrap_or(0);
                }
            }
        }
    }

    return sum.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = part1(
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
            Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
            Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
            Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        );
        assert_eq!(result, "8")
    }
}
