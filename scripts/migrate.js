const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/tailadmin-pages');
const outDir = path.join(__dirname, '../src/app/admin');
const componentsDir = path.join(__dirname, '../src/components/admin');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

function convertToJsx(html) {
    let jsx = html;
    // Comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    // Attributes
    jsx = jsx.replace(/\bclass="/g, 'className="');
    jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
    jsx = jsx.replace(/\btabindex="/g, 'tabIndex="');
    jsx = jsx.replace(/\bdatetime="/g, 'dateTime="');
    jsx = jsx.replace(/\bautocomplete="/g, 'autoComplete="');
    jsx = jsx.replace(/\bautofocus="/g, 'autoFocus="');
    jsx = jsx.replace(/\bnovalidate\b/g, 'noValidate');
    // Events
    jsx = jsx.replace(/\bonclick="/gi, 'onClick="');
    jsx = jsx.replace(/\bonchange="/gi, 'onChange="');
    jsx = jsx.replace(/\bonsubmit="/gi, 'onSubmit="');
    jsx = jsx.replace(/\bonkeydown="/gi, 'onKeyDown="');
    jsx = jsx.replace(/\bonkeyup="/gi, 'onKeyUp="');
    
    // Alpine.js binds - replace with data-* to make valid JSX
    jsx = jsx.replace(/\bx-data=/g, 'data-x-data=');
    jsx = jsx.replace(/\bx-show=/g, 'data-x-show=');
    jsx = jsx.replace(/\bx-cloak\b/g, 'data-x-cloak="true"');
    jsx = jsx.replace(/\bx-init=/g, 'data-x-init=');
    jsx = jsx.replace(/\bx-transition:([^=\s>]+)/g, 'data-x-transition-$1');
    jsx = jsx.replace(/\b@click\.prevent=/g, 'data-click-prevent=');
    jsx = jsx.replace(/\b@click\.outside=/g, 'data-click-outside=');
    jsx = jsx.replace(/\b@click=/g, 'data-click=');
    jsx = jsx.replace(/\b:class=/g, 'data-class=');
    jsx = jsx.replace(/\b:src=/g, 'data-src=');
    jsx = jsx.replace(/\b:href=/g, 'data-href=');
    
    // SVG attributes
    jsx = jsx.replace(/\bfill-rule=/gi, 'fillRule=');
    jsx = jsx.replace(/\bclip-rule=/gi, 'clipRule=');
    jsx = jsx.replace(/\bstroke-width=/gi, 'strokeWidth=');
    jsx = jsx.replace(/\bstroke-linecap=/gi, 'strokeLinecap=');
    jsx = jsx.replace(/\bstroke-linejoin=/gi, 'strokeLinejoin=');
    jsx = jsx.replace(/\bstroke-miterlimit=/gi, 'strokeMiterlimit=');
    jsx = jsx.replace(/\bstroke-dasharray=/gi, 'strokeDasharray=');
    jsx = jsx.replace(/\bstroke-dashoffset=/gi, 'strokeDashoffset=');
    jsx = jsx.replace(/\bstop-color=/gi, 'stopColor=');
    
    // Self-closing tags
    jsx = jsx.replace(/<(img|input|br|hr|source|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
    
    // Fix `style="width: 100%"` simple inline styles
    jsx = jsx.replace(/style="([^"]+)"/g, (match, styleString) => {
        const rules = styleString.split(';').filter(s => s.trim());
        const styleObj = {};
        rules.forEach(rule => {
            let [key, val] = rule.split(':');
            if (key && val) {
                key = key.trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
                styleObj[key] = val.trim();
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    return jsx;
}

const routeMap = {
    'index.html': '', // layout + main index
    'alerts.html': 'alerts',
    'avatars.html': 'avatars',
    'badge.html': 'badge',
    'bar-chart.html': 'bar-chart',
    'basic-tables.html': 'basic-tables',
    'blank.html': 'blank',
    'buttons.html': 'buttons',
    'calendar.html': 'calendar',
    'form-elements.html': 'form-elements',
    'images.html': 'images',
    'line-chart.html': 'line-chart',
    'profile.html': 'profile',
    'signin.html': 'auth/signin',
    'signup.html': 'auth/signup',
    'videos.html': 'videos'
};

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html') && routeMap.hasOwnProperty(f));

console.log(`Found ${files.length} pages to process.`);

files.forEach(file => {
    const filePath = path.join(srcDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    
    let mainContent = '';
    
    // Extract main content
    const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/i);
    if (mainMatch) {
       mainContent = mainMatch[1];
    } else {
       // fallback
       mainContent = `<div className="p-4">Content could not be parsed automatically.</div>`;
    }
    
    let jsxContent = convertToJsx(mainContent);
    // Replace <template> with React fragments <></> if they wrap valid jsx, or just normal divs
    jsxContent = jsxContent.replace(/<template([^>]*)>/gi, '<div$1> {/* Template converted to div */}').replace(/<\/template>/gi, '</div>');

    const componentName = file.replace('.html', '').replace(/(^\w|-\w)/g, (m) => m.replace('-', '').toUpperCase()) + 'Page';
    
    let destDir = path.join(outDir, routeMap[file]);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    
    const destFile = path.join(destDir, 'page.jsx');
    
    const componentTemplate = `
export default function ${componentName}() {
  return (
    <>
      ${jsxContent}
    </>
  );
}
`;
    fs.writeFileSync(destFile, componentTemplate);
    console.log(`Generated ${destFile}`);
    
    // Extract Sidebar and Header from index.html only once
    if (file === 'index.html') {
        const asideMatch = html.match(/<aside[\s\S]*?<\/aside>/i);
        if (asideMatch) {
            let sidebar = convertToJsx(asideMatch[0]);
            fs.writeFileSync(path.join(componentsDir, 'Sidebar.jsx'), 
`export default function Sidebar() {
  return (
    ${sidebar}
  );
}
`);
            console.log("Generated Sidebar.jsx");
        }
        
        const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
        if (headerMatch) {
            let header = convertToJsx(headerMatch[0]);
            header = header.replace(/<template([^>]*)>/gi, '<div$1> {/* Template converted to div */}').replace(/<\/template>/gi, '</div>');
            fs.writeFileSync(path.join(componentsDir, 'Header.jsx'), 
`export default function Header() {
  return (
    ${header}
  );
}
`);
            console.log("Generated Header.jsx");
        }
    }
});
