import React from "react";

export default function DownloadAsTextFile(results,fileName){
    var text = "";
    
    results.forEach(line => {
        text += line + "\n";
    });

    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName+".txt";
    document.body.appendChild(element);
    element.click();
} 