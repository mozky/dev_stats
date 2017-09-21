// TODO: Use compose or curry or something more fp
// TODO: Add days

function pad(s){
  return (s < 10 ? '0' : '') + s;
}

function Hours(seconds, pad, string) {
  return pad(Math.floor(seconds / (60*60))) + ':' + string
}

function Minutes(seconds, pad, string) {
  return pad(Math.floor(seconds % (60*60) / 60)) + ':' + string
}

function Seconds(seconds, pad) {
  return pad(Math.floor(seconds % 60))
}

function format(time, pad){
  return Hours(time, pad, Minutes(time, pad, Seconds(time, pad)))
}

exports.getTime = function() {
  return format(process.uptime(), pad)
}
