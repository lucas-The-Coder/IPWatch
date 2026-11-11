# IPWatch

IP Validator + Private vs Public + Blocklist Checker in Node.js

IPWatch validates an IPv4 address, tells you if it is private or public, and checks it against a blocklist. Helpers return data, only main prints. Built for learning backend validation basics: string split, arrays, validation, objects, edge cases.

## Features
- Validates IPv4 format, 4 octets, digits only, 0 to 255
- Classifies PRIVATE or PUBLIC, plus INVALID
- Handles private ranges 10, 172.16 to 31, 192.168, and loopback 127
- Checks IP against a blocklist array
- Guard for non string input
- No printing inside helpers

## How it works
- isValidIPv4(ip) returns a boolean, true if valid IPv4
- isPrivateIP(ip) returns a boolean, true if private or loopback
- checkIP(ip, blocklist) returns an object with ip, valid, type, blocklisted
- main() reads process.argv, calls checkIP, prints the result

## Usage

node ip_watch.js <ip_address>

## Examples

node ip_watch.js
Usage: node ip_watch.js <ip_address>

node ip_watch.js 192.168.1.1
192.168.1.1 -> PRIVATE | CLEAN

node ip_watch.js 8.8.8.8
8.8.8.8 -> PUBLIC | CLEAN

node ip_watch.js 999.1.1.1
999.1.1.1 -> INVALID

node ip_watch.js 185.220.101.4
185.220.101.4 -> PUBLIC | BLOCKLISTED

## Project structure

ip_watch.js, main CLI file
package.json, project metadata and scripts
.gitignore, ignored files
README.md, this file

## Security note
Validation is the first step in SOC triage. Never trust an IP string without checking format, range, and blocklist status. This blocklist is an example list in code. In production, use live threat intel, allow lists, and logging, and never block on a single indicator alone.

## Author
Luke Dennis, Midrand, South Africa
GitHub: https://github.com/lucas-The-Coder
LinkedIn: https://www.linkedin.com/in/luke-dennis-2730743b2
