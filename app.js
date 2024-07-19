var fs = require('fs-extra')

global.webp = require('webp-converter')
webp.grant_permission()

global.webp_util = {}

global.webp_util.paths = {
    tmp: __dirname + '/tmp/',
    input: __dirname + '/input/',
    output: __dirname + '/output/'
}

global.exec_cwd = global.webp_util.paths.tmp

fs.removeSync(global.webp_util.paths.tmp)
fs.mkdirSync(global.webp_util.paths.tmp)

var img2webp = new (require('./modules/img2webp.js'))()

var files = fs.readdirSync(global.webp_util.paths.input)

var fixPath = str => {
    return str.split('\\').join('/')
}

var start = async ()=>{
    var frames = []
    for (var i in files){
        var file = files[i]
        var webpFilename = file.split('.')[0] + '.webp'
        
        var srcPath = fixPath(global.webp_util.paths.input + file)
        var tmpPath = fixPath(global.webp_util.paths.tmp + webpFilename)

        await img2webp.convert(srcPath, tmpPath)

        var frameDelay = (1000/120).toFixed(0)
        if (frameDelay < 11) frameDelay = 11
        frames.push({
            path: webpFilename,
            offset: '+' + frameDelay + '+0+0+0-b' //add
        })
    }

    const result = webp.webpmux_animate(
        frames,
        global.webp_util.paths.output + 'out.webp',
        '1',
        '255,255,255,255',
        logging=""
    )

    result.then(response => {
        console.log(response)
        fs.removeSync(global.webp_util.paths.tmp)
    })
}

start()