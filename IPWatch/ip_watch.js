/**
 * @param {string} ip
 * @returns {boolean}
 */
function isValidIPv4(ip) {
  if (typeof ip !== "string") {
    return false;
  }

  const octets = ip.split(".");

  if (octets.length !== 4) {
    return false;
  }

  for (let i = 0; i < octets.length; i++) {
    const octet = octets[i];

    if (octet.length === 0) {
      return false;
    }

    if (!/^\d+$/.test(octet)) {
      return false;
    }

    const num = Number(octet);
    if (num < 0 || num > 255) {
      return false;
    }
  }

  return true;
}

/**
 * @param {string} ip
 * @returns {boolean}
 */
function isPrivateIP(ip) {
  const octets = ip.split(".");
  const first = Number(octets[0]);
  const second = Number(octets[1]);

  if (first === 10) {
    return true;
  }

  if (first === 172 && second >= 16 && second <= 31) {
    return true;
  }

  if (first === 192 && second === 168) {
    return true;
  }

  if (first === 127) {
    return true;
  }

  return false;
}

/**
 * @param {string} ip
 * @param {string[]} blocklist
 * @returns {object}
 */
function checkIP(ip, blocklist = []) {
  if (!isValidIPv4(ip)) {
    return {
      ip: ip,
      valid: false,
      type: "INVALID",
      blocklisted: false,
    };
  }

  const type = isPrivateIP(ip) ? "PRIVATE" : "PUBLIC";

  const blocklisted = Array.isArray(blocklist) ? blocklist.includes(ip) : false;

  return {
    ip: ip,
    valid: true,
    type: type,
    blocklisted: blocklisted,
  };
}

function main() {
  if (process.argv.length < 3) {
    console.log("Usage: node ip_watch.js <ip_address>");
    return;
  }

  const ip = process.argv[2];

  const blocklist = [
    "192.0.2.1",
    "198.51.100.42",
    "203.0.113.99",
    "45.33.32.156",
    "185.220.101.4",
  ];

  const result = checkIP(ip, blocklist);

  if (!result.valid) {
    console.log(`${result.ip} -> INVALID`);
  } else {
    const status = result.blocklisted ? "BLOCKLISTED" : "CLEAN";
    console.log(`${result.ip} -> ${result.type} | ${status}`);
  }

  return;
}

main();
