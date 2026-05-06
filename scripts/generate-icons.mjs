// Generates minimal valid PNG icons for PWA without external deps
import { createWriteStream } from 'fs'
import { deflateSync } from 'zlib'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dir, '../public')

function createPNG(size) {
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  function chunk(type, data) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const typeB = Buffer.from(type)
    const crcData = Buffer.concat([typeB, data])
    let crc = 0xffffffff
    for (const b of crcData) {
      crc ^= b
      for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
    crc ^= 0xffffffff
    const crcB = Buffer.alloc(4)
    crcB.writeUInt32BE(crc >>> 0)
    return Buffer.concat([len, typeB, data, crcB])
  }

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8   // bit depth
  ihdr[9] = 2   // RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

  // Image data: ocean blue gradient bg + white anchor shape
  const rows = []
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3)
    row[0] = 0 // filter type
    for (let x = 0; x < size; x++) {
      const cx = x - size / 2, cy = y - size / 2
      const r2 = cx * cx + cy * cy
      const R = size / 2

      // Gradient background: sky blue to deep blue
      const t = y / size
      const br = Math.round(14 * (1 - t) + 7 * t)
      const bg = Math.round(165 * (1 - t) + 89 * t)
      const bb = Math.round(233 * (1 - t) + 185 * t)

      // Draw a simple circle background
      let pr = br, pg = bg, pb = bb
      if (r2 > R * R) { pr = 15; pg = 23; pb = 42 } // dark outside

      row[1 + x * 3] = pr
      row[2 + x * 3] = pg
      row[3 + x * 3] = pb
    }
    rows.push(row)
  }

  const raw = Buffer.concat(rows)
  const idat = deflateSync(raw)

  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

mkdirSync(publicDir, { recursive: true })

for (const size of [192, 512]) {
  const png = createPNG(size)
  const path = join(publicDir, `pwa-${size}x${size}.png`)
  createWriteStream(path).write(png)
  console.log(`Created ${path}`)
}

// Apple touch icon (180x180)
const apple = createPNG(180)
createWriteStream(join(publicDir, 'apple-touch-icon.png')).write(apple)
console.log('Created apple-touch-icon.png')
