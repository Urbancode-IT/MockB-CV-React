const fs = require('fs');

try {
    const html = fs.readFileSync('e:\\MOCKB RESUME BUILDER\\FRONTEND\\RESUME CUSTOMIZER\\HTML\\editor.html', 'utf8');
    const regex = /<script>([\s\S]*?)<\/script>/;
    const match = html.match(regex);
    if (!match) {
        console.log("No script tag found!");
        process.exit(1);
    }
    
    const scriptContent = match[1];
    
    // Check syntax by creating a new Function
    try {
        new Function(scriptContent);
        console.log("Syntax OK!");
    } catch (e) {
        console.error("Syntax Error in script:", e.message);
        // Find line number
        const lines = scriptContent.split('\n');
        // V8 syntax errors sometimes don't give accurate line numbers when evaled this way
        // Let's write the script to a temp file and check it using child_process
        fs.writeFileSync('temp_script_for_syntax.js', scriptContent);
        require('child_process').execSync('node -c temp_script_for_syntax.js', {stdio: 'inherit'});
    }
} catch (e) {
    console.error("Failed to read or process file:", e.message);
}
