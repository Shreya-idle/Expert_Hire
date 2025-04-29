<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Travel App README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 2rem;
      line-height: 1.6;
    }
    h1, h2 {
      color: #333;
    }
    code {
      background-color: #f4f4f4;
      padding: 2px 6px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>🌍 Travel Explorer App</h1>
  <p>A modern travel content web app built with React, Tailwind CSS, Framer Motion, and Wouter.</p>

  <h2>🚀 Features</h2>
  <ul>
    <li>Responsive UI for categories like Guides, Cities, Foods, and more</li>
    <li>Dark mode support</li>
    <li>Animated cards and transitions</li>
    <li>Guide purchasing form with payment mock</li>
  </ul>

  <h2>📦 Installation</h2>
  <pre><code>npm install</code></pre>

  <h2>💻 Run Locally</h2>
  <pre><code>npm run dev</code></pre>

  <h2>🌐 Deploying to Vercel or GitHub Pages</h2>
  <ul>
    <li>Ensure your <code>build</code> output is working by running <code>npm run build</code></li>
    <li>For <strong>Vercel</strong>, link your GitHub repo and select <code>vite</code> as the framework (if applicable).</li>
    <li>For <strong>GitHub Pages</strong>, set the <code>homepage</code> field in <code>package.json</code>:</li>
  </ul>

  <pre><code>"homepage": "https://yourusername.github.io/your-repo-name"</code></pre>

  <ul>
    <li>Then run:</li>
  </ul>

  <pre><code>
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
  </code></pre>

  <h2>🛠 Common Issues</h2>
  <ul>
    <li>If your site is blank after deploying:
      <ul>
        <li>Make sure paths are correct: use <code>HashRouter</code> or Vite's <code>base</code> config if needed.</li>
        <li>Verify your output folder is named <code>dist</code> and contains your built app.</li>
        <li>In Vercel: check your <code>output directory</code> is set to <code>dist</code>.</li>
      </ul>
    </li>
  </ul>

  <h2>📄 License</h2>
  <p>MIT License. Free to use and modify.</p>
</body>
</html>
