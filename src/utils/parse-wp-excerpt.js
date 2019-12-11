const sanitizeHtml = require("sanitize-html")

function truncate(str, num) {
  if (str[num]) {
    for (let i = num; i < str.length; i++) {
      if (/\W/.test(str[i]) && str[i + 1]) {
        str = str.slice(0, i) + "..."
        break
      }
    }
  }
  return str
}

function parseWPExcerpt(str) {
  return truncate(
    sanitizeHtml(str, {
      allowedTags: [],
    }).replace("\n", ""),
    137
  )
}

module.exports = parseWPExcerpt
