# passgen

passgen is a command-line tool made using Deno and Cliffy. It helps you generate random passwords based on the options you give. You can choose what type of characters to include, how long the password should be, and whether to show it in the terminal or save it as a `.txt` file.

## Features

- Create passwords using:
    - Lowercase letters
    - Uppercase letters
    - Numbers
    - Symbols
    - Custom symbols (if you want to use only specific symbols)
- Choose to:
    - Show the password in the CLI
    - Save the password in a `.txt` file

## How to Use

1. Make sure you have [Deno](https://deno.land/) installed.

2. Clone this repository:

```bash
git clone https://github.com/runtime-terror-028/passgen

cd passgen

deno run start
```

## Example

```bash
=====| Password Generator |=====

? Enter password length » 5
? Do you want to add lowercase characters in your password? (y/n) » Yes
? Do you want to add uppercase characters in your password? (y/n) » Yes
? Do you want to add numbers in your password? (y/n) » Yes
? Do you want to add all default symbolic characters in your password? (y/n) » Yes
🔃 Generating your password ...
✅ Password generated successfully.
? How you want to view your password? » Show password here
🔑 Generated password: n)R61
? Generate another password? » No / Yes

```

## Plans for future

- Add SQLite database to persist generated passwords
- 2 - way encryption
- Save passwords with platform name and user id
- let users:
  - add new credentials to database
  - view all saved credentials in cli
  - search for specific cli
  - export saved credentials to .txt file