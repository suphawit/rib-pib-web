#!/usr/bin/env node
'use strict';

var md5File = require('md5-file'),
    fs = require('fs');

/**
 * This script renames files inside platforms/browser/www/ folder and updates their references in html files like index.html
 * The mechanism is for improve caching. So file like `main.js` will be renamed to `main.[FILE-MD5-HASH].js` and its references
 * in html files will be updated.
 */
var buildFolder = 'dist/';
var assetsFolder = buildFolder + '';
var buildVersion;

var replaceName = [
    'bootstrap.css',
    'font-awesome.min.css',
    'components-rounded.css',
    'fontello.css',
    'layout.css',
    'custom.css',
    'spinner.min.css',
    'sjcl.js',
    'sha.js',
    'polyfills.js',
    'ibmmfpfanalytics.js',
    'ibmmfpf.js',
    'vendor.js',
    'main.js',
    'intl.js',
    'jQassets.js',
    'browserCompatible.js'
]

var htmlFilesToUpdate = [
    'index.html'
];

process.argv.forEach(function (val, index, array) {
    switch(index){
        // index 2: first argurment
        case 2:
            buildVersion = val;
            break;
        default:
            buildVersion = '-';
            break;
    }
    console.log(index + ': ' + val);
});

htmlFilesToUpdate.forEach(function (htmlFile) {
    console.log('Update "' + htmlFile + '" with new file revisions.');
    replaceName.forEach(function(filename){
        console.log('Replacements:from: ' + filename +':to:' + filename+'?version='+buildVersion );
        replaceInFile(buildFolder + htmlFile, filename, filename+'?version='+buildVersion);
    })
});


function replaceInFile(file, regex, replacement) {
    var fileContents = fs.readFileSync(file, 'utf-8');
    fs.writeFileSync(file, fileContents.replace(regex, replacement), 'utf8');
}