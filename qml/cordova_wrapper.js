var pluginObjects = {}

function addPlugin(pluginName, pluginObject) {
    pluginObjects[pluginName] = pluginObject
}

function messageHandler(message) {
    var received = eval('('+message.data+')')
    if (typeof received == 'undefined')
        return false
    if (typeof received.messageType == 'undefined')
        return false
    if (received.messageType == "callPluginFunction") {
        if (typeof received.plugin == 'undefined' ||
                typeof received.func == 'undefined')
            return false
        execMethod(received.plugin, received.func, received.params)
    }
    return true
}


function execMethod(pluginName, functionName, params) {
    if( typeof pluginObjects[pluginName][functionName] != "function" )
        return false
    pluginObjects[pluginName][functionName].apply(this, params)
    return true
}

