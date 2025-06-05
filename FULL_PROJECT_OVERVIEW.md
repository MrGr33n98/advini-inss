# 🧾 Full Overview do Projeto: project

## 📂 Estrutura de Pastas

```
📁 .bolt
  📄 config.json
  📄 prompt
📄 .gitignore
📄 eslint.config.js
📄 generate-full-doc.js
📄 index.html
📄 package-lock.json
📄 package.json
📄 postcss.config.js
📄 PROJECT_OVERVIEW.md
📁 public
  📄 restituicao-favicon.svg
📁 src
  📁 api
    📄 submitLead.ts
  📄 App.tsx
  📁 components
    📄 BlogPreview.tsx
    📄 DiagnosisForm.tsx
    📄 FAQSection.tsx
    📄 Footer.tsx
    📄 Header.tsx
    📄 HeroSection.tsx
    📄 HowItWorks.tsx
    📄 LawyerProfiles.tsx
    📄 TrustBadges.tsx
    📄 VideoSection.tsx
    📄 WhatsAppButton.tsx
  📄 index.css
  📁 lib
    📄 data.ts
    📄 db.ts
    📄 schema.ts
  📄 main.tsx
  📄 vite-env.d.ts
📄 tailwind.config.js
📄 tsconfig.app.json
📄 tsconfig.json
📄 tsconfig.node.json
📄 vite.config.ts

```

## 📄 Conteúdo dos Arquivos

### .bolt\config.json
```json
{
  "template": "bolt-vite-react-ts"
}

```

### .bolt\prompt
```
For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

Use icons from lucide-react for logos.

```

### .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.env

```

### eslint.config.js
```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);

```

### generate-full-doc.js
```js
// generate-full-doc.js (ESM versão)
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = __dirname;
const outputFile = path.join(projectRoot, "FULL_PROJECT_OVERVIEW.md");

// Função para percorrer recursivamente o diretório e retornar a estrutura de árvore e lista de arquivos
async function walk(dir, depth = 0) {
    const entries = await fs.readdir(dir);
    let tree = "";
    let files = [];

    for (const entry of entries) {
        // Ignorar node_modules e .git
        if (entry === "node_modules" || entry === ".git") continue;

        const fullPath = path.join(dir, entry);
        const stats = await fs.stat(fullPath);
        const prefix = "  ".repeat(depth) + (stats.isDirectory() ? "📁 " : "📄 ");

        tree += `${prefix}${entry}\n`;

        if (stats.isDirectory()) {
            const { tree: subTree, files: subFiles } = await walk(fullPath, depth + 1);
            tree += subTree;
            files = files.concat(subFiles);
        } else {
            files.push(fullPath);
        }
    }

    return { tree, files };
}

// Função para ler o conteúdo de cada arquivo (assume-se arquivos de texto)
// Se não for possível ler, retorna null
async function readFileContent(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf-8");
        return content;
    } catch (err) {
        return null;
    }
}

// Monta o markdown com a árvore de arquivos e conteúdo de cada arquivo
async function buildMarkdown({ tree, files }) {
    let md = `# 🧾 Full Overview do Projeto: ${path.basename(projectRoot)}

## 📂 Estrutura de Pastas

\`\`\`
${tree}
\`\`\`

## 📄 Conteúdo dos Arquivos

`;

    for (const file of files) {
        const relPath = path.relative(projectRoot, file);
        // Extensão para identificar a linguagem do code block
        const ext = path.extname(file).slice(1) || "";
        const content = await readFileContent(file);

        md += `### ${relPath}
\`\`\`${ext}
${content || "[Não foi possível ler o conteúdo]"}
\`\`\`

`;
    }

    return md;
}

async function run() {
    // 1) Gera árvore e lista de todos os arquivos
    const { tree, files } = await walk(projectRoot);

    // 2) Monta o Markdown completo
    const md = await buildMarkdown({ tree, files });

    // 3) Grava o arquivo FULL_PROJECT_OVERVIEW.md
    await fs.writeFile(outputFile, md);
    console.log(`✅ Documentação completa gerada em ${outputFile}`);
}

run().catch(err => {
    console.error("Erro ao gerar documentação:", err);
});
```

### index.html
```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/restituicao-favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Restituição em Dobro INSS: Recupere Descontos Indevidos | Análise Gratuita</title>
    <meta name="description" content="Aposentado(a) ou pensionista com descontos indevidos? Descubra como reaver seu dinheiro em dobro com análise gratuita. Somos especialistas em direito previdenciário." />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://restituicao-em-dobro.com.br/" />
    <meta property="og:title" content="Restituição em Dobro INSS: Recupere Descontos Indevidos" />
    <meta property="og:description" content="Aposentado(a) ou pensionista com descontos indevidos? Descubra como reaver seu dinheiro em dobro com análise gratuita." />
    <meta property="og:image" content="https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg" />
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://restituicao-em-dobro.com.br/" />
    <meta property="twitter:title" content="Restituição em Dobro INSS: Recupere Descontos Indevidos" />
    <meta property="twitter:description" content="Aposentado(a) ou pensionista com descontos indevidos? Descubra como reaver seu dinheiro em dobro com análise gratuita." />
    <meta property="twitter:image" content="https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg" />
    <!-- Structured Data -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "Restituição em Dobro INSS",
        "description": "Recuperação de valores descontados indevidamente em benefícios do INSS, com restituição em dobro garantida por lei.",
        "url": "https://restituicao-em-dobro.com.br",
        "telephone": "+5565992918889",
        "areaServed": "Brasil",
        "serviceType": "Direito Previdenciário",
        "priceRange": "Análise Gratuita",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Paulista, 1000",
          "addressLocality": "São Paulo",
          "addressRegion": "SP",
          "postalCode": "01310-100",
          "addressCountry": "BR"
        }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### package-lock.json
```json
{
  "name": "restituicao-em-dobro-landing",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "restituicao-em-dobro-landing",
      "version": "0.1.0",
      "dependencies": {
        "@hookform/resolvers": "^3.3.4",
        "better-sqlite3": "^9.4.1",
        "framer-motion": "^11.0.5",
        "lucide-react": "^0.344.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-hook-form": "^7.50.1",
        "zod": "^3.22.4"
      },
      "devDependencies": {
        "@eslint/js": "^9.9.1",
        "@types/react": "^18.3.5",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.1",
        "autoprefixer": "^10.4.18",
        "eslint": "^9.9.1",
        "eslint-plugin-react-hooks": "^5.1.0-rc.0",
        "eslint-plugin-react-refresh": "^0.4.11",
        "globals": "^15.9.0",
        "postcss": "^8.4.35",
        "tailwindcss": "^3.4.1",
        "typescript": "^5.5.3",
        "typescript-eslint": "^8.3.0",
        "vite": "^5.4.2"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@ampproject/remapping": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",
      "integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",
      "dev": true,
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.25.7.tgz",
      "integrity": "sha512-0xZJFNE5XMpENsgfHYTw8FbX4kv53mFLn2i3XPoq69LyhYSCBJtitaHx9QnsVTrsogI4Z3+HtEfZ2/GFPOtf5g==",
      "dev": true,
      "dependencies": {
        "@babel/highlight": "^7.25.7",
        "picocolors": "^1.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.25.7.tgz",
      "integrity": "sha512-9ickoLz+hcXCeh7jrcin+/SLWm+GkxE2kTvoYyp38p4WkdFXfQJxDFGWp/YHjiKLPx06z2A7W8XKuqbReXDzsw==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.25.7.tgz",
      "integrity": "sha512-yJ474Zv3cwiSOO9nXJuqzvwEeM+chDuQ8GJirw+pZ91sCGCyOZ3dJkVE09fTV0VEVzXyLWhh3G/AolYTPX7Mow==",
      "dev": true,
      "dependencies": {
        "@ampproject/remapping": "^2.2.0",
        "@babel/code-frame": "^7.25.7",
        "@babel/generator": "^7.25.7",
        "@babel/helper-compilation-targets": "^7.25.7",
        "@babel/helper-module-transforms": "^7.25.7",
        "@babel/helpers": "^7.25.7",
        "@babel/parser": "^7.25.7",
        "@babel/template": "^7.25.7",
        "@babel/traverse": "^7.25.7",
        "@babel/types": "^7.25.7",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.25.7.tgz",
      "integrity": "sha512-5Dqpl5fyV9pIAD62yK9P7fcA768uVPUyrQmqpqstHWgMma4feF1x/oFysBCVZLY5wJ2GkMUCdsNDnGZrPoR6rA==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.25.7",
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.25",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.25.7.tgz",
      "integrity": "sha512-DniTEax0sv6isaw6qSQSfV4gVRNtw2rte8HHM45t9ZR0xILaufBRNkpMifCRiAPyvL4ACD6v0gfCwCmtOQaV4A==",
      "dev": true,
      "dependencies": {
        "@babel/compat-data": "^7.25.7",
        "@babel/helper-validator-option": "^7.25.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.25.7.tgz",
      "integrity": "sha512-o0xCgpNmRohmnoWKQ0Ij8IdddjyBFE4T2kagL/x6M3+4zUgc+4qTOUBoNe4XxDskt1HPKO007ZPiMgLDq2s7Kw==",
      "dev": true,
      "dependencies": {
        "@babel/traverse": "^7.25.7",
        "@babel/types": "^7.25.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.25.7.tgz",
      "integrity": "sha512-k/6f8dKG3yDz/qCwSM+RKovjMix563SLxQFo0UhRNo239SP6n9u5/eLtKD6EAjwta2JHJ49CsD8pms2HdNiMMQ==",
      "dev": true,
      "dependencies": {
        "@babel/helper-module-imports": "^7.25.7",
        "@babel/helper-simple-access": "^7.25.7",
        "@babel/helper-validator-identifier": "^7.25.7",
        "@babel/traverse": "^7.25.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.25.7.tgz",
      "integrity": "sha512-eaPZai0PiqCi09pPs3pAFfl/zYgGaE6IdXtYvmf0qlcDTd3WCtO7JWCcRd64e0EQrcYgiHibEZnOGsSY4QSgaw==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-simple-access": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-simple-access/-/helper-simple-access-7.25.7.tgz",
      "integrity": "sha512-FPGAkJmyoChQeM+ruBGIDyrT2tKfZJO8NcxdC+CWNJi7N8/rZpSxK7yvBJ5O/nF1gfu5KzN7VKG3YVSLFfRSxQ==",
      "dev": true,
      "dependencies": {
        "@babel/traverse": "^7.25.7",
        "@babel/types": "^7.25.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.25.7.tgz",
      "integrity": "sha512-CbkjYdsJNHFk8uqpEkpCvRs3YRp9tY6FmFY7wLMSYuGYkrdUi7r2lc4/wqsvlHoMznX3WJ9IP8giGPq68T/Y6g==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.25.7.tgz",
      "integrity": "sha512-AM6TzwYqGChO45oiuPqwL2t20/HdMC1rTPAesnBCgPCSF1x3oN9MVUwQV2iyz4xqWrctwK5RNC8LV22kaQCNYg==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.25.7.tgz",
      "integrity": "sha512-ytbPLsm+GjArDYXJ8Ydr1c/KJuutjF2besPNbIZnZ6MKUxi/uTA22t2ymmA4WFjZFpjiAMO0xuuJPqK2nvDVfQ==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.25.7.tgz",
      "integrity": "sha512-Sv6pASx7Esm38KQpF/U/OXLwPPrdGHNKoeblRxgZRLXnAtnkEe4ptJPDtAZM7fBLadbc1Q07kQpSiGQ0Jg6tRA==",
      "dev": true,
      "dependencies": {
        "@babel/template": "^7.25.7",
        "@babel/types": "^7.25.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/highlight": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/highlight/-/highlight-7.25.7.tgz",
      "integrity": "sha512-iYyACpW3iW8Fw+ZybQK+drQre+ns/tKpXbNESfrhNnPLIklLbXr7MYJ6gPEd0iETGLOK+SxMjVvKb/ffmk+FEw==",
      "dev": true,
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.25.7",
        "chalk": "^2.4.2",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.25.7.tgz",
      "integrity": "sha512-aZn7ETtQsjjGG5HruveUK06cU3Hljuhd9Iojm4M8WWv3wLE6OkE5PWbDUkItmMgegmccaITudyuW5RPYrYlgWw==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.25.7"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.25.7.tgz",
      "integrity": "sha512-JD9MUnLbPL0WdVK8AWC7F7tTG2OS6u/AKKnsK+NdRhUiVdnzyR1S3kKQCaRLOiaULvUiqK6Z4JQE635VgtCFeg==",
      "dev": true,
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.25.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.25.7.tgz",
      "integrity": "sha512-S/JXG/KrbIY06iyJPKfxr0qRxnhNOdkNXYBl/rmwgDd72cQLH9tEGkDm/yJPGvcSIUoikzfjMios9i+xT/uv9w==",
      "dev": true,
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.25.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.25.7.tgz",
      "integrity": "sha512-wRwtAgI3bAS+JGU2upWNL9lSlDcRCqD05BZ1n3X2ONLH1WilFP6O1otQjeMK/1g0pvYcXC7b/qVUB1keofjtZA==",
      "dev": true,
      "dependencies": {
        "@babel/code-frame": "^7.25.7",
        "@babel/parser": "^7.25.7",
        "@babel/types": "^7.25.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.25.7.tgz",
      "integrity": "sha512-jatJPT1Zjqvh/1FyJs6qAHL+Dzb7sTb+xr7Q+gM1b+1oBsMsQQ4FkVKb6dFlJvLlVssqkRzV05Jzervt9yhnzg==",
      "dev": true,
      "dependencies": {
        "@babel/code-frame": "^7.25.7",
        "@babel/generator": "^7.25.7",
        "@babel/parser": "^7.25.7",
        "@babel/template": "^7.25.7",
        "@babel/types": "^7.25.7",
        "debug": "^4.3.1",
        "globals": "^11.1.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse/node_modules/globals": {
      "version": "11.12.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
      "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.25.7",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.25.7.tgz",
      "integrity": "sha512-vwIVdXG+j+FOpkwqHRcBgHLYNL7XMkufrlaFvL9o6Ai9sJn9+PdyIL5qa0XzTZw084c+u9LOls53eoZWP/W5WQ==",
      "dev": true,
      "dependencies": {
        "@babel/helper-string-parser": "^7.25.7",
        "@babel/helper-validator-identifier": "^7.25.7",
        "to-fast-properties": "^2.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz",
      "integrity": "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
      "integrity": "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
      "integrity": "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
      "integrity": "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz",
      "integrity": "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz",
      "integrity": "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz",
      "integrity": "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz",
      "integrity": "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz",
      "integrity": "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz",
      "integrity": "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz",
      "integrity": "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz",
      "integrity": "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz",
      "integrity": "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz",
      "integrity": "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz",
      "integrity": "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz",
      "integrity": "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz",
      "integrity": "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz",
      "integrity": "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz",
      "integrity": "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz",
      "integrity": "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz",
      "integrity": "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz",
      "integrity": "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz",
      "integrity": "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.4.0.tgz",
      "integrity": "sha512-1/sA4dwrzBAyeUoQ6oxahHKmrZvsnLCg4RfxW3ZFGGmQkSNQPFNLV9CUEFQP1x9EYXHTo5p6xdhZM1Ne9p/AfA==",
      "dev": true,
      "dependencies": {
        "eslint-visitor-keys": "^3.3.0"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.11.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.11.1.tgz",
      "integrity": "sha512-m4DVN9ZqskZoLU5GlWZadwDnYo3vAEydiUayB9widCl9ffWx2IvPnp6n3on5rJmziJSw9Bv+Z3ChDVdMwXCY8Q==",
      "dev": true,
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.18.0",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.18.0.tgz",
      "integrity": "sha512-fTxvnS1sRMu3+JjXwJG0j/i4RT9u4qJ+lqS/yCGap4lH4zZGzQ7tu+xZqQmcMZq5OBZDL4QRxQzRjkWcGt8IVw==",
      "dev": true,
      "dependencies": {
        "@eslint/object-schema": "^2.1.4",
        "debug": "^4.3.1",
        "minimatch": "^3.1.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.6.0.tgz",
      "integrity": "sha512-8I2Q8ykA4J0x0o7cg67FPVnehcqWTBehu/lmY+bolPFHGjh49YzGBMXTvpqVgEbBdvNCSxj6iFgiIyHzf03lzg==",
      "dev": true,
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.1.0.tgz",
      "integrity": "sha512-4Bfj15dVJdoy3RfZmmo86RK1Fwzn6SstsvK9JS+BaVKqC6QQQQyXekNaC+g+LKNgkQ+2VhGAzm6hO40AhMR3zQ==",
      "dev": true,
      "dependencies": {
        "ajv": "^6.12.4",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.12.0",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.12.0.tgz",
      "integrity": "sha512-eohesHH8WFRUprDNyEREgqP6beG6htMeUYeCpkEgBCieCMme5r9zFWjzAJp//9S+Kub4rqE+jXe9Cp1a7IYIIA==",
      "dev": true,
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.4.tgz",
      "integrity": "sha512-BsWiH1yFGjXXS2yvrf5LyuoSIIbPrGUWob917o+BTKuZ7qJdxX8aJLRxs1fS9n6r7vESrq1OUqb68dANcFXuQQ==",
      "dev": true,
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.2.0.tgz",
      "integrity": "sha512-vH9PiIMMwvhCx31Af3HiGzsVNULDbyVkHXwlemn/B0TFj/00ho3y55efXrUZTfQipxoHC5u4xq6zblww1zm1Ig==",
      "dev": true,
      "dependencies": {
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@hookform/resolvers": {
      "version": "3.10.0",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-3.10.0.tgz",
      "integrity": "sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==",
      "license": "MIT",
      "peerDependencies": {
        "react-hook-form": "^7.0.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.0",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.0.tgz",
      "integrity": "sha512-2cbWIHbZVEweE853g8jymffCA+NCMiuqeECeBBLm8dg2oFdjuGJhgN4UAbI+6v0CKbbhvtXA4qV8YR5Ji86nmw==",
      "dev": true,
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.5",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.5.tgz",
      "integrity": "sha512-KSPA4umqSG4LHYRodq31VDwKAvaTF4xmVlzM8Aeh4PlU1JQ3IG0wiA8C25d3RQ9nJyM3mBHyI53K06VVL/oFFg==",
      "dev": true,
      "dependencies": {
        "@humanfs/core": "^0.19.0",
        "@humanwhocodes/retry": "^0.3.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.3.1.tgz",
      "integrity": "sha512-JBxkERygn7Bv/GbN5Rv8Ul6LVknS+5Bp6RgDC/O8gEBU/yeH5Ui5C/OlWrTb6qct7LjjfT6Re2NxB0ln0yYybA==",
      "dev": true,
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "dev": true,
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.5.tgz",
      "integrity": "sha512-IzL8ZoEDIBRWEzlCcRhOaCupYyN5gdIK+Q6fbFdPDg6HqX6jpkItn7DFIpW9LQzXG6Df9sA7+OKnq0qlz/GaQg==",
      "dev": true,
      "dependencies": {
        "@jridgewell/set-array": "^1.2.1",
        "@jridgewell/sourcemap-codec": "^1.4.10",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/set-array": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.2.1.tgz",
      "integrity": "sha512-R8gLRTZeyp03ymzP/6Lil/28tGeGEzhx1q2k703KGWRAI1VdvPIXdG70VJc2pAMw3NA6JKL5hhFu1sJX0Mnn/A==",
      "dev": true,
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.0.tgz",
      "integrity": "sha512-gv3ZRaISU3fjPAgNsriBRqGWQL6quFx04YMPW/zD8XMLsU32mhCCbfbO6KZFLjvYpCZ8zyDEgqsgf+PwPaM7GQ==",
      "dev": true
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.25",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.25.tgz",
      "integrity": "sha512-vNk6aEwybGtawWmy/PzwnGDOjCkLWSD2wqvjGGAgOAwCGWySYXfYoxt00IJkTF+8Lb57DwOb3Aa0o9CApepiYQ==",
      "dev": true,
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "dev": true,
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.24.0.tgz",
      "integrity": "sha512-Q6HJd7Y6xdB48x8ZNVDOqsbh2uByBhgK8PiQgPhwkIw/HC/YX5Ghq2mQY5sRMZWHb3VsFkWooUVOZHKr7DmDIA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.24.0.tgz",
      "integrity": "sha512-ijLnS1qFId8xhKjT81uBHuuJp2lU4x2yxa4ctFPtG+MqEE6+C5f/+X/bStmxapgmwLwiL3ih122xv8kVARNAZA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.24.0.tgz",
      "integrity": "sha512-bIv+X9xeSs1XCk6DVvkO+S/z8/2AMt/2lMqdQbMrmVpgFvXlmde9mLcbQpztXm1tajC3raFDqegsH18HQPMYtA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.24.0.tgz",
      "integrity": "sha512-X6/nOwoFN7RT2svEQWUsW/5C/fYMBe4fnLK9DQk4SX4mgVBiTA9h64kjUYPvGQ0F/9xwJ5U5UfTbl6BEjaQdBQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.24.0.tgz",
      "integrity": "sha512-0KXvIJQMOImLCVCz9uvvdPgfyWo93aHHp8ui3FrtOP57svqrF/roSSR5pjqL2hcMp0ljeGlU4q9o/rQaAQ3AYA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.24.0.tgz",
      "integrity": "sha512-it2BW6kKFVh8xk/BnHfakEeoLPv8STIISekpoF+nBgWM4d55CZKc7T4Dx1pEbTnYm/xEKMgy1MNtYuoA8RFIWw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.24.0.tgz",
      "integrity": "sha512-i0xTLXjqap2eRfulFVlSnM5dEbTVque/3Pi4g2y7cxrs7+a9De42z4XxKLYJ7+OhE3IgxvfQM7vQc43bwTgPwA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.24.0.tgz",
      "integrity": "sha512-9E6MKUJhDuDh604Qco5yP/3qn3y7SLXYuiC0Rpr89aMScS2UAmK1wHP2b7KAa1nSjWJc/f/Lc0Wl1L47qjiyQw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-powerpc64le-gnu": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-powerpc64le-gnu/-/rollup-linux-powerpc64le-gnu-4.24.0.tgz",
      "integrity": "sha512-2XFFPJ2XMEiF5Zi2EBf4h73oR1V/lycirxZxHZNc93SqDN/IWhYYSYj8I9381ikUFXZrz2v7r2tOVk2NBwxrWw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.24.0.tgz",
      "integrity": "sha512-M3Dg4hlwuntUCdzU7KjYqbbd+BLq3JMAOhCKdBE3TcMGMZbKkDdJ5ivNdehOssMCIokNHFOsv7DO4rlEOfyKpg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.24.0.tgz",
      "integrity": "sha512-mjBaoo4ocxJppTorZVKWFpy1bfFj9FeCMJqzlMQGjpNPY9JwQi7OuS1axzNIk0nMX6jSgy6ZURDZ2w0QW6D56g==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.24.0.tgz",
      "integrity": "sha512-ZXFk7M72R0YYFN5q13niV0B7G8/5dcQ9JDp8keJSfr3GoZeXEoMHP/HlvqROA3OMbMdfr19IjCeNAnPUG93b6A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.24.0.tgz",
      "integrity": "sha512-w1i+L7kAXZNdYl+vFvzSZy8Y1arS7vMgIy8wusXJzRrPyof5LAb02KGr1PD2EkRcl73kHulIID0M501lN+vobQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.24.0.tgz",
      "integrity": "sha512-VXBrnPWgBpVDCVY6XF3LEW0pOU51KbaHhccHw6AS6vBWIC60eqsH19DAeeObl+g8nKAz04QFdl/Cefta0xQtUQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.24.0.tgz",
      "integrity": "sha512-xrNcGDU0OxVcPTH/8n/ShH4UevZxKIO6HJFK0e15XItZP2UcaiLFd5kiX7hJnqCbSztUF8Qot+JWBC/QXRPYWQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.24.0.tgz",
      "integrity": "sha512-fbMkAF7fufku0N2dE5TBXcNlg0pt0cJue4xBRE2Qc5Vqikxr4VCgKj/ht6SMdFcOacVA9rqF70APJ8RN/4vMJw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.6.8",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.6.8.tgz",
      "integrity": "sha512-ASsj+tpEDsEiFr1arWrlN6V3mdfjRMZt6LtK/Vp/kreFLnr5QH5+DhvD5nINYZXzwJvXeGq+05iUXcAzVrqWtw==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.20.6",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.20.6.tgz",
      "integrity": "sha512-r1bzfrm0tomOI8g1SzvCaQHo6Lcv6zu0EA+W2kHrt8dyrHQxGzBBL4kdkzIS+jBMV+EYcMAEAqXqYaLJq5rOZg==",
      "dev": true,
      "dependencies": {
        "@babel/types": "^7.20.7"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.6.tgz",
      "integrity": "sha512-AYnb1nQyY49te+VRAVgmzfcgjYS91mY5P0TKUDCLEM+gNnA+3T6rWITXRLYCpahpqSQbN5cE+gHpnPyXjHWxcw==",
      "dev": true
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.13",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.13.tgz",
      "integrity": "sha512-hCZTSvwbzWGvhqxp/RqVqwU999pBf2vp7hzIjiYOsl8wqOmUxkQ6ddw1cV3l8811+kdUFus/q4d1Y3E3SyEifA==",
      "dev": true
    },
    "node_modules/@types/react": {
      "version": "18.3.11",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.11.tgz",
      "integrity": "sha512-r6QZ069rFTjrEYgFdOck1gK7FLVsgJE7tTz0pQBczlBNUhBNk0MQH4UbnFSwjpQLMkLzgqvBBa+qGpLje16eTQ==",
      "dev": true,
      "dependencies": {
        "@types/prop-types": "*",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "18.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.0.tgz",
      "integrity": "sha512-EhwApuTmMBmXuFOikhQLIBUn6uFg81SwLMOAUgodJF14SOBOCMdU04gDoYi0WOJJHD144TL32z4yDqCW3dnkQg==",
      "dev": true,
      "dependencies": {
        "@types/react": "*"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.8.1.tgz",
      "integrity": "sha512-xfvdgA8AP/vxHgtgU310+WBnLB4uJQ9XdyP17RebG26rLtDrQJV3ZYrcopX91GrHmMoH8bdSwMRh2a//TiJ1jQ==",
      "dev": true,
      "dependencies": {
        "@eslint-community/regexpp": "^4.10.0",
        "@typescript-eslint/scope-manager": "8.8.1",
        "@typescript-eslint/type-utils": "8.8.1",
        "@typescript-eslint/utils": "8.8.1",
        "@typescript-eslint/visitor-keys": "8.8.1",
        "graphemer": "^1.4.0",
        "ignore": "^5.3.1",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^1.3.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.0.0 || ^8.0.0-alpha.0",
        "eslint": "^8.57.0 || ^9.0.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.8.1.tgz",
      "integrity": "sha512-hQUVn2Lij2NAxVFEdvIGxT9gP1tq2yM83m+by3whWFsWC+1y8pxxxHUFE1UqDu2VsGi2i6RLcv4QvouM84U+ow==",
      "dev": true,
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.8.1",
        "@typescript-eslint/types": "8.8.1",
        "@typescript-eslint/typescript-estree": "8.8.1",
        "@typescript-eslint/visitor-keys": "8.8.1",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.8.1.tgz",
      "integrity": "sha512-X4JdU+66Mazev/J0gfXlcC/dV6JI37h+93W9BRYXrSn0hrE64IoWgVkO9MSJgEzoWkxONgaQpICWg8vAN74wlA==",
      "dev": true,
      "dependencies": {
        "@typescript-eslint/types": "8.8.1",
        "@typescript-eslint/visitor-keys": "8.8.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.8.1.tgz",
      "integrity": "sha512-qSVnpcbLP8CALORf0za+vjLYj1Wp8HSoiI8zYU5tHxRVj30702Z1Yw4cLwfNKhTPWp5+P+k1pjmD5Zd1nhxiZA==",
      "dev": true,
      "dependencies": {
        "@typescript-eslint/typescript-estree": "8.8.1",
        "@typescript-eslint/utils": "8.8.1",
        "debug": "^4.3.4",
        "ts-api-utils": "^1.3.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.8.1.tgz",
      "integrity": "sha512-WCcTP4SDXzMd23N27u66zTKMuEevH4uzU8C9jf0RO4E04yVHgQgW+r+TeVTNnO1KIfrL8ebgVVYYMMO3+jC55Q==",
      "dev": true,
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.8.1.tgz",
      "integrity": "sha512-A5d1R9p+X+1js4JogdNilDuuq+EHZdsH9MjTVxXOdVFfTJXunKJR/v+fNNyO4TnoOn5HqobzfRlc70NC6HTcdg==",
      "dev": true,
      "dependencies": {
        "@typescript-eslint/types": "8.8.1",
        "@typescript-eslint/visitor-keys": "8.8.1",
        "debug": "^4.3.4",
        "fast-glob": "^3.3.2",
        "is-glob": "^4.0.3",
        "minimatch": "^9.0.4",
        "semver": "^7.6.0",
        "ts-api-utils": "^1.3.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
      "integrity": "sha512-XnAIvQ8eM+kC6aULx6wuQiwVsnzsi9d3WxzV3FpWTGA19F621kwdbsAcFKXgKUHZWsy+mY6iL1sHTxWEFCytDA==",
      "dev": true,
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
      "version": "7.6.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.6.3.tgz",
      "integrity": "sha512-oVekP1cKtI+CTDvHWYFUcMtsK/00wmAEfyqKfNdARm8u1wNVhSgaX7A8d4UuIlUI5e84iEwOhs7ZPYRmzU9U6A==",
      "dev": true,
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.8.1.tgz",
      "integrity": "sha512-/QkNJDbV0bdL7H7d0/y0qBbV2HTtf0TIyjSDTvvmQEzeVx8jEImEbLuOA4EsvE8gIgqMitns0ifb5uQhMj8d9w==",
      "dev": true,
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.4.0",
        "@typescript-eslint/scope-manager": "8.8.1",
        "@typescript-eslint/types": "8.8.1",
        "@typescript-eslint/typescript-estree": "8.8.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.8.1.tgz",
      "integrity": "sha512-0/TdC3aeRAsW7MDvYRwEc1Uwm0TIBfzjPFgg60UU2Haj5qsCs9cc3zNgY71edqE3LbWfF/WoZQd3lJoDXFQpag==",
      "dev": true,
      "dependencies": {
        "@typescript-eslint/types": "8.8.1",
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.3.2.tgz",
      "integrity": "sha512-hieu+o05v4glEBucTcKMK3dlES0OeJlD9YVOAPraVMOInBCwzumaIFiUjr4bHK7NPgnAHgiskUoceKercrN8vg==",
      "dev": true,
      "dependencies": {
        "@babel/core": "^7.25.2",
        "@babel/plugin-transform-react-jsx-self": "^7.24.7",
        "@babel/plugin-transform-react-jsx-source": "^7.24.7",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.14.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0"
      }
    },
    "node_modules/acorn": {
      "version": "8.12.1",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.12.1.tgz",
      "integrity": "sha512-tcpGyI9zbizT9JbV6oYE477V6mTlXvvi0T0G3SNIYE2apm/G5huBa1+K89VGeovbg+jycCrfhl3ADxErOuO6Jg==",
      "dev": true,
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.12.6",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
      "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
      "dev": true,
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-regex": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.1.0.tgz",
      "integrity": "sha512-7HSX4QQb4CspciLpVFwyRe79O3xsIZDDLER21kERQ71oaPodF8jL725AgJMFAYbooIqolJoRLuM81SpeUkpkvA==",
      "dev": true,
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
      "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
      "dev": true,
      "dependencies": {
        "color-convert": "^1.9.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true
    },
    "node_modules/autoprefixer": {
      "version": "10.4.20",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.20.tgz",
      "integrity": "sha512-XY25y5xSv/wEoqzDyXXME4AFfkZI0P23z6Fs3YgymDnKJkCGOnkL0iTxCa85UTqaSgfcqyf3UA6+c7wUvx/16g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "browserslist": "^4.23.3",
        "caniuse-lite": "^1.0.30001646",
        "fraction.js": "^4.3.7",
        "normalize-range": "^0.1.2",
        "picocolors": "^1.0.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true
    },
    "node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/better-sqlite3": {
      "version": "9.6.0",
      "resolved": "https://registry.npmjs.org/better-sqlite3/-/better-sqlite3-9.6.0.tgz",
      "integrity": "sha512-yR5HATnqeYNVnkaUTf4bOP2dJSnyhP4puJN/QPRyx4YkBEEUxib422n2XzPqDEHjQQqazoYoADdAm5vE15+dAQ==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "bindings": "^1.5.0",
        "prebuild-install": "^7.1.1"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/bindings": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/bindings/-/bindings-1.5.0.tgz",
      "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
      "license": "MIT",
      "dependencies": {
        "file-uri-to-path": "1.0.0"
      }
    },
    "node_modules/bl": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/bl/-/bl-4.1.0.tgz",
      "integrity": "sha512-1W07cM9gS6DcLperZfFSj+bWLtaPGSOHWhPiGzXmvVJbRLdG82sH/Kn8EtW1VqWVA54AKf2h5k5BbnIbwF3h6w==",
      "license": "MIT",
      "dependencies": {
        "buffer": "^5.5.0",
        "inherits": "^2.0.4",
        "readable-stream": "^3.4.0"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
      "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
      "dev": true,
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.24.0.tgz",
      "integrity": "sha512-Rmb62sR1Zpjql25eSanFGEhAxcFwfA1K0GuQcLoaJBAcENegrQut3hYdhXFF1obQfiDyqIW/cLM5HSJ/9k884A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "caniuse-lite": "^1.0.30001663",
        "electron-to-chromium": "^1.5.28",
        "node-releases": "^2.0.18",
        "update-browserslist-db": "^1.1.0"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/buffer": {
      "version": "5.7.1",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.7.1.tgz",
      "integrity": "sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.1.13"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001667",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001667.tgz",
      "integrity": "sha512-7LTwJjcRkzKFmtqGsibMeuXmvFDfZq/nzIjnmgCGzKKRVzjD72selLDK1oPF/Oxzmt4fNcPvTDvGqSDG4tCALw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ]
    },
    "node_modules/chalk": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
      "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
      "dev": true,
      "dependencies": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/chownr": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
      "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg==",
      "license": "ISC"
    },
    "node_modules/color-convert": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
      "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
      "dev": true,
      "dependencies": {
        "color-name": "1.1.3"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha512-72fSenhMw2HZMTVHeCA9KCmpEIbzWiQsjN+BHcBbS9vr1mtt+vJjPdksIBNUmKAW8TFUDPJK5SUU3QhE9NEXDw==",
      "dev": true
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true
    },
    "node_modules/cross-spawn": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.3.tgz",
      "integrity": "sha512-iRDPJKUPVEND7dHPO8rkbOnPpyDygcDFtWjpeWNCgy8WP2rXcxXL8TskReQl6OrB2G7+UJrags1q15Fudc7G6w==",
      "dev": true,
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.3.tgz",
      "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
      "dev": true
    },
    "node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "dev": true,
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decompress-response": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/decompress-response/-/decompress-response-6.0.0.tgz",
      "integrity": "sha512-aW35yZM6Bb/4oJlZncMH2LCoZtJXTRxES17vE3hoRiowU2kWHaJKFkSBDnDR+cm9J+9QhXmREyIfv0pji9ejCQ==",
      "license": "MIT",
      "dependencies": {
        "mimic-response": "^3.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/deep-extend": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/deep-extend/-/deep-extend-0.6.0.tgz",
      "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA==",
      "license": "MIT",
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true
    },
    "node_modules/detect-libc": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.0.4.tgz",
      "integrity": "sha512-3UDv+G9CsCKO1WKMGw9fwq/SWJYbI0c5Y7LU1AXYoDdbhE2AHQ6N6Nb34sG8Fj7T5APy8qXDCKuuIHd1BR0tVA==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
      "dev": true
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.33",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.33.tgz",
      "integrity": "sha512-+cYTcFB1QqD4j4LegwLfpCNxifb6dDFUAwk6RsLusCwIaZI6or2f+q8rs5tTB2YC53HhOlIbEaqHMAAC8IOIwA==",
      "dev": true
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true
    },
    "node_modules/end-of-stream": {
      "version": "1.4.4",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
      "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
      "license": "MIT",
      "dependencies": {
        "once": "^1.4.0"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw==",
      "dev": true,
      "hasInstallScript": true,
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.21.5",
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz",
      "integrity": "sha512-vbRorB5FUQWvla16U8R/qgaFIya2qGzwDrNmCZuYKrbdSUMG6I1ZCGQRefkRVhuOkIGVne7BQ35DSfo1qvJqFg==",
      "dev": true,
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/eslint": {
      "version": "9.12.0",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.12.0.tgz",
      "integrity": "sha512-UVIOlTEWxwIopRL1wgSQYdnVDcEvs2wyaO6DGo5mXqe3r16IoCNWkR29iHhyaP4cICWjbgbmFUGAhh0GJRuGZw==",
      "dev": true,
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.2.0",
        "@eslint-community/regexpp": "^4.11.0",
        "@eslint/config-array": "^0.18.0",
        "@eslint/core": "^0.6.0",
        "@eslint/eslintrc": "^3.1.0",
        "@eslint/js": "9.12.0",
        "@eslint/plugin-kit": "^0.2.0",
        "@humanfs/node": "^0.16.5",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.3.1",
        "@types/estree": "^1.0.6",
        "@types/json-schema": "^7.0.15",
        "ajv": "^6.12.4",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.2",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.1.0",
        "eslint-visitor-keys": "^4.1.0",
        "espree": "^10.2.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.2",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3",
        "text-table": "^0.2.0"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "5.1.0-rc-fb9a90fa48-20240614",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.1.0-rc-fb9a90fa48-20240614.tgz",
      "integrity": "sha512-xsiRwaDNF5wWNC4ZHLut+x/YcAxksUd9Rizt7LaEn3bV8VyYRpXnRJQlLOfYaVy9esk4DFP4zPPnoNVjq5Gc0w==",
      "dev": true,
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.4.12",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.4.12.tgz",
      "integrity": "sha512-9neVjoGv20FwYtCP6CB1dzR1vr57ZDNOXst21wd2xJ/cTlM2xLq0GWVlSNTdMn/4BtP6cHYBMCSp1wFBJ9jBsg==",
      "dev": true,
      "peerDependencies": {
        "eslint": ">=7"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.1.0.tgz",
      "integrity": "sha512-14dSvlhaVhKKsa9Fx1l8A17s7ah7Ef7wCakJ10LYk6+GYmP9yDti2oq2SEwcyndt6knfcZyhyxwY3i9yL78EQw==",
      "dev": true,
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.1.0.tgz",
      "integrity": "sha512-Q7lok0mqMUSf5a/AdAZkA5a/gHcO6snwQClVNNvFKCAVlxXucdU8pKydU5ZVZjBx5xr37vGbFFWtLQYreLzrZg==",
      "dev": true,
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/eslint/node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/eslint/node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/eslint/node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true
    },
    "node_modules/eslint/node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint/node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/eslint/node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/espree": {
      "version": "10.2.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.2.0.tgz",
      "integrity": "sha512-upbkBJbckcCNBDBDXEbuhjbP68n+scUd3k/U2EkyM9nw+I/jPiL4cLF/Al06CF96wRltFda16sxDFrxsI1v0/g==",
      "dev": true,
      "dependencies": {
        "acorn": "^8.12.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.1.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.6.0.tgz",
      "integrity": "sha512-ca9pw9fomFcKPvFLXhBKUK90ZvGibiGOvRJNbjljY7s7uq/5YO4BOzcYtJqExdx99rF6aAcnRxHmcUHcz6sQsg==",
      "dev": true,
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/expand-template": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/expand-template/-/expand-template-2.0.3.tgz",
      "integrity": "sha512-XYfuKMvj4O35f/pOXLObndIRvyQ+/+6AhODh+OKWj9S9498pHHn/IMszH+gt0fBCRWMNfk1ZSp5x3AifmnI2vg==",
      "license": "(MIT OR WTFPL)",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true
    },
    "node_modules/fast-glob": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.2.tgz",
      "integrity": "sha512-oX2ruAFQwf/Orj8m737Y5adxDQO0LAB7/S5MnxCdTNDd4p6BsyIVsv9JQsATbTSq8KHRpLwIHbVlUNatxd+1Ow==",
      "dev": true,
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true
    },
    "node_modules/fastq": {
      "version": "1.17.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.17.1.tgz",
      "integrity": "sha512-sRVD3lWVIXWg6By68ZN7vho9a1pQcN/WBFaAAsDDFzlJjvoGx0P8z7V1t72grFJfJhu3YPZBuu25f7Kaw2jN1w==",
      "dev": true,
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/file-uri-to-path": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
      "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw==",
      "license": "MIT"
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.3.1.tgz",
      "integrity": "sha512-X8cqMLLie7KsNUDSdzeN8FYK9rEt4Dt67OsG/DNGnYTSDBG4uFAJFBnUeiV+zCVAvwFy56IjM9sH51jVaEhNxw==",
      "dev": true
    },
    "node_modules/foreground-child": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.0.tgz",
      "integrity": "sha512-Ld2g8rrAyMYFXBhEqMz8ZAHBi4J4uS1i/CxGMDnjyFWddMXLVcDp051DZfu+t7+ab7Wv6SMqpWmyFIj5UbfFvg==",
      "dev": true,
      "dependencies": {
        "cross-spawn": "^7.0.0",
        "signal-exit": "^4.0.1"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/fraction.js": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
      "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
      "dev": true,
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "patreon",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/framer-motion": {
      "version": "11.18.2",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-11.18.2.tgz",
      "integrity": "sha512-5F5Och7wrvtLVElIpclDT0CBzMVg3dL22B64aZwHtsIY8RB4mXICLrkajK4G9R+ieSAGcgrLeae2SeUTg2pr6w==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "^11.18.1",
        "motion-utils": "^11.18.1",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fs-constants": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
      "integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow==",
      "license": "MIT"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/github-from-package": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/github-from-package/-/github-from-package-0.0.0.tgz",
      "integrity": "sha512-SyHy3T1v2NUXn29OsWdxmK6RwHD+vkj3v8en8AOBZ1wBQ/hCAQ5bAQTD02kW4W9tUp/3Qh6J8r9EvntiyCmOOw==",
      "license": "MIT"
    },
    "node_modules/glob": {
      "version": "10.4.5",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
      "integrity": "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg==",
      "dev": true,
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^3.1.2",
        "minimatch": "^9.0.4",
        "minipass": "^7.1.2",
        "package-json-from-dist": "^1.0.0",
        "path-scurry": "^1.11.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/glob/node_modules/brace-expansion": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
      "integrity": "sha512-XnAIvQ8eM+kC6aULx6wuQiwVsnzsi9d3WxzV3FpWTGA19F621kwdbsAcFKXgKUHZWsy+mY6iL1sHTxWEFCytDA==",
      "dev": true,
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/glob/node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/globals": {
      "version": "15.11.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-15.11.0.tgz",
      "integrity": "sha512-yeyNSjdbyVaWurlwCpcA6XNBrHTMIeDdj0/hnvX/OLJ9ekOXYbLsLinH/MucQyGvNnXhidTdNhTtJaffL2sMfw==",
      "dev": true,
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/graphemer": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/graphemer/-/graphemer-1.4.0.tgz",
      "integrity": "sha512-EtKwoO6kxCL9WO5xipiHTZlSzBm7WLT627TqC/uVRd0HKmq8NXyebnNYxDoBi7wt8eTWrUrKXCOVaFq9x1kgag==",
      "dev": true
    },
    "node_modules/has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha512-sKJf1+ceQBr4SMkvQnBDNDtf4TXpVhVGateu0t918bl30FnbE2m4vNLX+VWe/dpjlb+HugGYzW7uQXH98HPEYw==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "dev": true,
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ieee754": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.0.tgz",
      "integrity": "sha512-veYYhQa+D1QBKznvhUHxb8faxlrwUnxseDAbAp457E0wLNio2bOSKnjYDhMj+YiAq61xrMGhQk9iXVk5FzgQMw==",
      "dev": true,
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ini": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.8.tgz",
      "integrity": "sha512-JV/yugV2uzW5iMRSiZAyDtQd+nxtUnjeLt0acNdw98kKLrvuRVyB80tsREOE7yvGVgalhZ6RNXCmEHkUKBKxew==",
      "license": "ISC"
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.15.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.15.1.tgz",
      "integrity": "sha512-z0vtXSwucUJtANQWldhbtbt7BnL0vxiFjIdDLAatwhDYty2bad6s+rijD6Ri4YuYJubLzIJLUidCh09e1djEVQ==",
      "dev": true,
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true
    },
    "node_modules/jackspeak": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-3.4.3.tgz",
      "integrity": "sha512-OGlZQpz2yfahA/Rd1Y8Cd9SIEsqvXkLVoSw/cgwhnhFMDbsQFeZYoJJ7bIZBS9BcamUW96asq/npPWugM+RQBw==",
      "dev": true,
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.6",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.6.tgz",
      "integrity": "sha512-2yTgeWTWzMWkHu6Jp9NKgePDaYHbntiwvYuuJLbbN9vl7DC9DvXKOB2BC3ZZ92D3cvV/aflH0osDfwpHepQ53w==",
      "dev": true,
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
    },
    "node_modules/js-yaml": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.0.tgz",
      "integrity": "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA==",
      "dev": true,
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.0.2.tgz",
      "integrity": "sha512-xKqzzWXDttJuOcawBt4KnKHHIf5oQ/Cxax+0PWFG+DFDgHNAdi+TXECADI+RYiFUMmx8792xsMbbgXj4CwnP4g==",
      "dev": true,
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lilconfig": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-2.1.0.tgz",
      "integrity": "sha512-utWOt/GHzuUxnLKxB6dk81RoOeoNeHgbrXiuGk4yyF5qlRz+iIVWu56E2fqGHFrXz0QNUhLB/8nKqvRH66JKGQ==",
      "dev": true,
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.344.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.344.0.tgz",
      "integrity": "sha512-6YyBnn91GB45VuVT96bYCOKElbJzUHqp65vX8cDcu55MQL9T969v4dhGClpljamuI/+KMO9P6w9Acq1CVQGvIQ==",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/mimic-response": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/mimic-response/-/mimic-response-3.1.0.tgz",
      "integrity": "sha512-z0yWI+4FDrrweS8Zmt4Ej5HdJmky15+L2e6Wgn3+iK5fWzb6T3fhNFq2+MeTRb064c6Wr4N/wv0DzQTjNzHNGQ==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.2.tgz",
      "integrity": "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==",
      "dev": true,
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/mkdirp-classic": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/mkdirp-classic/-/mkdirp-classic-0.5.3.tgz",
      "integrity": "sha512-gKLcREMhtuZRwRAfqP3RFW+TK4JqApVBtOIftVgjuABpAtpxhPGaDcfvbhNvD0B8iD1oUr/txX35NjcaY6Ns/A==",
      "license": "MIT"
    },
    "node_modules/motion-dom": {
      "version": "11.18.1",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-11.18.1.tgz",
      "integrity": "sha512-g76KvA001z+atjfxczdRtw/RXOM3OMSdd1f4DL77qCTF/+avrRJiawSG4yDibEQ215sr9kpinSlX2pCTJ9zbhw==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "^11.18.1"
      }
    },
    "node_modules/motion-utils": {
      "version": "11.18.1",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-11.18.1.tgz",
      "integrity": "sha512-49Kt+HKjtbJKLtgO/LKj9Ld+6vw9BjH5d9sc40R/kVyH8GLAXgT42M2NnuPcJNuA3s9ZfZBUcwIgpmZWGEE+hA==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.7",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.7.tgz",
      "integrity": "sha512-eSRppjcPIatRIMC1U6UngP8XFcz8MQWGQdt1MTBQ7NaAmvXDfvNxbvWV3x2y6CdEUciCSsDHDQZbhYaB8QEo2g==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/napi-build-utils": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/napi-build-utils/-/napi-build-utils-2.0.0.tgz",
      "integrity": "sha512-GEbrYkbfF7MoNaoh2iGG84Mnf/WZfB0GdGEsM8wz7Expx/LlWf5U8t9nvJKXSp3qr5IsEbK04cBGhol/KwOsWA==",
      "license": "MIT"
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true
    },
    "node_modules/node-abi": {
      "version": "3.75.0",
      "resolved": "https://registry.npmjs.org/node-abi/-/node-abi-3.75.0.tgz",
      "integrity": "sha512-OhYaY5sDsIka7H7AtijtI9jwGYLyl29eQn/W623DiN/MIv5sUqc4g7BIDThX+gb7di9f6xK02nkp8sdfFWZLTg==",
      "license": "MIT",
      "dependencies": {
        "semver": "^7.3.5"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/node-abi/node_modules/semver": {
      "version": "7.7.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.2.tgz",
      "integrity": "sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.18",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.18.tgz",
      "integrity": "sha512-d9VeXT4SJ7ZeOqGX6R5EM022wpL+eWPooLI+5UpWn2jCT1aosUQEhQP214x33Wkwx3JQMvIm+tIoVOdodFS40g==",
      "dev": true
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/package-json-from-dist": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/package-json-from-dist/-/package-json-from-dist-1.0.1.tgz",
      "integrity": "sha512-UEZIS3/by4OC8vL3P2dTXRETpebLI2NiI5vIrjaD/5UtrkFX/tNbwjTSRAGC/+7CAo2pIcBaRgWmcBBHcsaCIw==",
      "dev": true
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true
    },
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "dev": true,
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-scurry/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true
    },
    "node_modules/picocolors": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.0.tgz",
      "integrity": "sha512-TQ92mBOW0l3LeMeyLV6mzy/kWr8lkd/hp3mTg7wYK7zJhuBStmGMBG0BdeDZS/dZx1IukaX6Bk11zcln25o1Aw==",
      "dev": true
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.6.tgz",
      "integrity": "sha512-saLsH7WeYYPiD25LDuLRRY/i+6HaPYr6G1OUlN39otzkSTxKnubR9RTxS3/Kk50s1g2JTgFwWQDQyplC5/SHZg==",
      "dev": true,
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.47",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.47.tgz",
      "integrity": "sha512-56rxCq7G/XfB4EkXq9Egn5GCqugWvDFjafDOThIdMBsI15iqPqR5r15TfSr1YPYeEI19YeaXMCbY6u88Y76GLQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "nanoid": "^3.3.7",
        "picocolors": "^1.1.0",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.0.1.tgz",
      "integrity": "sha512-dDLF8pEO191hJMtlHFPRa8xsizHaM82MLfNkUHdUtVEV3tgTp5oj+8qbEqYM57SLfc74KSbw//4SeJma2LRVIw==",
      "dev": true,
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/postcss/"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.2.tgz",
      "integrity": "sha512-bSVhyJGL00wMVoPUzAVAnbEoWyqRxkjv64tUl427SKnPrENtq6hJwUojroMz2VB+Q1edmi4IfrAPpami5VVgMQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "lilconfig": "^3.0.0",
        "yaml": "^2.3.4"
      },
      "engines": {
        "node": ">= 14"
      },
      "peerDependencies": {
        "postcss": ">=8.0.9",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "postcss": {
          "optional": true
        },
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-load-config/node_modules/lilconfig": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.2.tgz",
      "integrity": "sha512-eop+wDAvpItUys0FWkHIKeC9ybYrTGbU41U5K7+bttZZeohvnY7M9dZ5kB21GNWiFT2q1OoPTvncPCgSOVO5ow==",
      "dev": true,
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.2.tgz",
      "integrity": "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg==",
      "dev": true,
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true
    },
    "node_modules/prebuild-install": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/prebuild-install/-/prebuild-install-7.1.3.tgz",
      "integrity": "sha512-8Mf2cbV7x1cXPUILADGI3wuhfqWvtiLA1iclTDbFRZkgRQS0NqsPZphna9V+HyTEadheuPmjaJMsbzKQFOzLug==",
      "license": "MIT",
      "dependencies": {
        "detect-libc": "^2.0.0",
        "expand-template": "^2.0.3",
        "github-from-package": "0.0.0",
        "minimist": "^1.2.3",
        "mkdirp-classic": "^0.5.3",
        "napi-build-utils": "^2.0.0",
        "node-abi": "^3.3.0",
        "pump": "^3.0.0",
        "rc": "^1.2.7",
        "simple-get": "^4.0.0",
        "tar-fs": "^2.0.0",
        "tunnel-agent": "^0.6.0"
      },
      "bin": {
        "prebuild-install": "bin.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/pump": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.2.tgz",
      "integrity": "sha512-tUPXtzlGM8FE3P0ZL6DVs/3P58k9nk8/jZeQCurTJylQA8qFYzHFfhBJkuqyE0FifOsQ0uKWekiZ5g8wtr28cw==",
      "license": "MIT",
      "dependencies": {
        "end-of-stream": "^1.1.0",
        "once": "^1.3.1"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ]
    },
    "node_modules/rc": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/rc/-/rc-1.2.8.tgz",
      "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
      "license": "(BSD-2-Clause OR MIT OR Apache-2.0)",
      "dependencies": {
        "deep-extend": "^0.6.0",
        "ini": "~1.3.0",
        "minimist": "^1.2.0",
        "strip-json-comments": "~2.0.1"
      },
      "bin": {
        "rc": "cli.js"
      }
    },
    "node_modules/rc/node_modules/strip-json-comments": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
      "integrity": "sha512-4gB8na07fecVVkOI6Rs4e7T6NOTki5EmL7TUduTs6bu3EdnSycntVJ4re8kgZA+wx9IueI2Y11bfbgwtzuE0KQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.57.0",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.57.0.tgz",
      "integrity": "sha512-RbEks3+cbvTP84l/VXGUZ+JMrKOS8ykQCRYdm5aYsxnDquL0vspsyNhGRO7pcH6hsZqWlPOjLye7rJqdtdAmlg==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.14.2",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.14.2.tgz",
      "integrity": "sha512-jCvmsr+1IUSMUyzOkRcvnVbX3ZYC6g9TDrDbFuFmRDq7PD4yaGbLKNQL6k2jnArV8hjYxh7hVhAZB6s9HDGpZA==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dev": true,
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.8",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.8.tgz",
      "integrity": "sha512-oKWePCxqpd6FlLvGV1VU0x7bkPmmCNolxzjMf4NczoDnQcIWrAF+cPtZn5i6n+RfD2d9i0tzpKnG6Yk168yIyw==",
      "dev": true,
      "dependencies": {
        "is-core-module": "^2.13.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/reusify": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
      "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==",
      "dev": true,
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.24.0",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.24.0.tgz",
      "integrity": "sha512-DOmrlGSXNk1DM0ljiQA+i+o0rSLhtii1je5wgk60j49d1jHT5YYttBv1iWOnYSTG+fZZESUOSNiAl89SIet+Cg==",
      "dev": true,
      "dependencies": {
        "@types/estree": "1.0.6"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.24.0",
        "@rollup/rollup-android-arm64": "4.24.0",
        "@rollup/rollup-darwin-arm64": "4.24.0",
        "@rollup/rollup-darwin-x64": "4.24.0",
        "@rollup/rollup-linux-arm-gnueabihf": "4.24.0",
        "@rollup/rollup-linux-arm-musleabihf": "4.24.0",
        "@rollup/rollup-linux-arm64-gnu": "4.24.0",
        "@rollup/rollup-linux-arm64-musl": "4.24.0",
        "@rollup/rollup-linux-powerpc64le-gnu": "4.24.0",
        "@rollup/rollup-linux-riscv64-gnu": "4.24.0",
        "@rollup/rollup-linux-s390x-gnu": "4.24.0",
        "@rollup/rollup-linux-x64-gnu": "4.24.0",
        "@rollup/rollup-linux-x64-musl": "4.24.0",
        "@rollup/rollup-win32-arm64-msvc": "4.24.0",
        "@rollup/rollup-win32-ia32-msvc": "4.24.0",
        "@rollup/rollup-win32-x64-msvc": "4.24.0",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "dev": true,
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/simple-concat": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/simple-concat/-/simple-concat-1.0.1.tgz",
      "integrity": "sha512-cSFtAPtRhljv69IK0hTVZQ+OfE9nePi/rtJmw5UjHeVyVroEqJXP1sFztKUy1qU+xvz3u/sfYJLa947b7nAN2Q==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/simple-get": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/simple-get/-/simple-get-4.0.1.tgz",
      "integrity": "sha512-brv7p5WgH0jmQJr1ZDDfKDOSeWWg+OVypG99A/5vYGPqJ6pxiaHLy8nxtFjBA7oMa01ebA9gfh1uMCFqOuXxvA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "decompress-response": "^6.0.0",
        "once": "^1.3.1",
        "simple-concat": "^1.0.0"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "dev": true,
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true
    },
    "node_modules/string-width-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.0.tgz",
      "integrity": "sha512-iq6eVVI64nQQTRYq2KtEg2d2uU7LElhTJwsH4YzIHZshxlgZms/wIc4VoDQTlG/IvVIrBKG06CrZnp0qv7hkcQ==",
      "dev": true,
      "dependencies": {
        "ansi-regex": "^6.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.0",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.0.tgz",
      "integrity": "sha512-8EbVDiu9iN/nESwxeSxDKe0dunta1GOlHufmSSXxMD2z2/tMZpDMpvXQGsc+ajGo8y2uYUmixaSRUc/QPoQ0GA==",
      "dev": true,
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "glob": "^10.3.10",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-color": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
      "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
      "dev": true,
      "dependencies": {
        "has-flag": "^3.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.13",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.13.tgz",
      "integrity": "sha512-KqjHOJKogOUt5Bs752ykCeiwvi0fKVkr5oqsFNt/8px/tA8scFPIlkygsf6jXrfCqGHz7VflA6+yytWuM+XhFw==",
      "dev": true,
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.5.3",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.0",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.0",
        "lilconfig": "^2.1.0",
        "micromatch": "^4.0.5",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.0.0",
        "postcss": "^8.4.23",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.1",
        "postcss-nested": "^6.0.1",
        "postcss-selector-parser": "^6.0.11",
        "resolve": "^1.22.2",
        "sucrase": "^3.32.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tar-fs": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/tar-fs/-/tar-fs-2.1.3.tgz",
      "integrity": "sha512-090nwYJDmlhwFwEW3QQl+vaNnxsO2yVsd45eTKRBzSzu+hlb1w2K9inVq5b0ngXuLVqQ4ApvsUHHnu/zQNkWAg==",
      "license": "MIT",
      "dependencies": {
        "chownr": "^1.1.1",
        "mkdirp-classic": "^0.5.2",
        "pump": "^3.0.0",
        "tar-stream": "^2.1.4"
      }
    },
    "node_modules/tar-stream": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-2.2.0.tgz",
      "integrity": "sha512-ujeqbceABgwMZxEJnk2HDY2DlnUZ+9oEcb1KzTVfYHio0UE6dG71n60d8D2I4qNvleWrrXpmjpt7vZeF1LnMZQ==",
      "license": "MIT",
      "dependencies": {
        "bl": "^4.0.3",
        "end-of-stream": "^1.4.1",
        "fs-constants": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.1.1"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/text-table": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
      "integrity": "sha512-N+8UisAXDGk8PFXP4HAzVR9nbfmVJ3zYLAWiTIoqC5v5isinhr+r5uaO8+7r3BMfuNIufIsA7RdpVgacC2cSpw==",
      "dev": true
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/to-fast-properties": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/to-fast-properties/-/to-fast-properties-2.0.0.tgz",
      "integrity": "sha512-/OaKK0xYrs3DmxRYqL/yDc+FxFUVYhDlXMhRmv3z915w2HF1tnN1omB354j8VUGO/hbRzyD6Y3sA7v7GS/ceog==",
      "dev": true,
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-1.3.0.tgz",
      "integrity": "sha512-UQMIo7pb8WRomKR1/+MFVLTroIvDVtMX3K6OUir8ynLyzB8Jeriont2bTAtmNPa1ekAgN7YPDyf6V+ygrdU+eQ==",
      "dev": true,
      "engines": {
        "node": ">=16"
      },
      "peerDependencies": {
        "typescript": ">=4.2.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha512-McnNiV1l8RYeY8tBgEpuodCC1mLUdbSN+CYBL7kJsJNInOP8UjDDEwdk6Mw60vdLLrr5NHKZhMAOSrR2NZuQ+w==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typescript": {
      "version": "5.6.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.6.3.tgz",
      "integrity": "sha512-hjcS1mhfuyi4WW8IWtjP7brDrG2cuDZukyrYrSauoXGNgx0S7zceP07adYkJycEr56BOUTNPzbInooiN3fn1qw==",
      "dev": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/typescript-eslint": {
      "version": "8.8.1",
      "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.8.1.tgz",
      "integrity": "sha512-R0dsXFt6t4SAFjUSKFjMh4pXDtq04SsFKCVGDP3ZOzNP7itF0jBcZYU4fMsZr4y7O7V7Nc751dDeESbe4PbQMQ==",
      "dev": true,
      "dependencies": {
        "@typescript-eslint/eslint-plugin": "8.8.1",
        "@typescript-eslint/parser": "8.8.1",
        "@typescript-eslint/utils": "8.8.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.1.tgz",
      "integrity": "sha512-R8UzCaa9Az+38REPiJ1tXlImTJXlVfgHZsglwBD/k6nj76ctsH1E3q4doGrukiLQd3sGQYu56r5+lo5r94l29A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.0"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw=="
    },
    "node_modules/vite": {
      "version": "5.4.8",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.8.tgz",
      "integrity": "sha512-FqrItQ4DT1NC4zCUqMB4c4AZORMKIa0m8/URVCZ77OZ/QSNeJ54bU1vrFADbDsuwfIPcgknRkmqakQcgnL4GiQ==",
      "dev": true,
      "dependencies": {
        "esbuild": "^0.21.3",
        "postcss": "^8.4.43",
        "rollup": "^4.20.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || >=20.0.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "dev": true,
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true
    },
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-styles": {
      "version": "6.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.1.tgz",
      "integrity": "sha512-bN798gFfQX+viw3R7yrGWRqnrN2oRkEkUjjl4JNn4E8GxxbjtG3FbrEIIY3l8/hrwUwIeCZvi4QuOTP4MErVug==",
      "dev": true,
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true
    },
    "node_modules/yaml": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.5.1.tgz",
      "integrity": "sha512-bLQOjaX/ADgQ20isPJRvF0iRUHIxVhYvr53Of7wGcWlO2jvtUlH5m87DsmulFVxRpNLOnI4tB6p/oh8D7kpn9Q==",
      "dev": true,
      "bin": {
        "yaml": "bin.mjs"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.25.51",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.51.tgz",
      "integrity": "sha512-TQSnBldh+XSGL+opiSIq0575wvDPqu09AqWe1F7JhUMKY+M91/aGlK4MhpVNO7MgYfHcVCB1ffwAUTJzllKJqg==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    }
  }
}

```

### package.json
```json
{
  "name": "restituicao-em-dobro-landing",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.50.1",
    "zod": "^3.22.4",
    "framer-motion": "^11.0.5",
    "@hookform/resolvers": "^3.3.4",
    "better-sqlite3": "^9.4.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

### postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

### PROJECT_OVERVIEW.md
```md
# 🧾 Projeto: restituicao-em-dobro-landing

![Badge](https://img.shields.io/badge/stack-TypeScript-blue)

## 📂 Estrutura de Pastas

```
📁 .bolt
  📄 config.json
  📄 prompt
📄 .gitignore
📄 eslint.config.js
📄 generate-doc.js
📄 index.html
📄 package-lock.json
📄 package.json
📄 postcss.config.js
📄 PROJECT_OVERVIEW.md
📁 public
  📄 restituicao-favicon.svg
📁 src
  📁 api
    📄 submitLead.ts
  📄 App.tsx
  📁 components
    📄 BlogPreview.tsx
    📄 DiagnosisForm.tsx
    📄 FAQSection.tsx
    📄 Footer.tsx
    📄 Header.tsx
    📄 HeroSection.tsx
    📄 HowItWorks.tsx
    📄 LawyerProfiles.tsx
    📄 TrustBadges.tsx
    📄 VideoSection.tsx
    📄 WhatsAppButton.tsx
  📄 index.css
  📁 lib
    📄 data.ts
    📄 db.ts
    📄 schema.ts
  📄 main.tsx
  📄 vite-env.d.ts
📄 tailwind.config.js
📄 tsconfig.app.json
📄 tsconfig.json
📄 tsconfig.node.json
📄 vite.config.ts

```

## 🧪 Scripts Disponíveis

- `dev`: `vite`
- `build`: `vite build`
- `lint`: `eslint .`
- `preview`: `vite preview`


### 📦 Dependências Principais
- lucide-react: `^0.344.0`
- react: `^18.3.1`
- react-dom: `^18.3.1`
- react-hook-form: `^7.50.1`
- zod: `^3.22.4`

### 🛠️ DevDependencies
- @eslint/js: `^9.9.1`
- @types/react: `^18.3.5`
- @types/react-dom: `^18.3.0`
- @vitejs/plugin-react: `^4.3.1`
- autoprefixer: `^10.4.18`


## 📁 Arquivos `.ts` / `.tsx` encontrados

- src\api\submitLead.ts
- src\App.tsx
- src\components\BlogPreview.tsx
- src\components\DiagnosisForm.tsx
- src\components\FAQSection.tsx
- src\components\Footer.tsx
- src\components\Header.tsx
- src\components\HeroSection.tsx
- src\components\HowItWorks.tsx
- src\components\LawyerProfiles.tsx
- src\components\TrustBadges.tsx
- src\components\VideoSection.tsx
- src\components\WhatsAppButton.tsx
- src\lib\data.ts
- src\lib\db.ts
- src\lib\schema.ts
- src\main.tsx
- src\vite-env.d.ts

## 🛠️ Configurações Detectadas

- Vite: [object Promise]
- Tailwind: [object Promise]
- TypeScript: [object Promise]

```

### public\restituicao-favicon.svg
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="#3F51B5"/>
  <path d="M22 10H10C8.9 10 8 10.9 8 12V20C8 21.1 8.9 22 10 22H22C23.1 22 24 21.1 24 20V12C24 10.9 23.1 10 22 10Z" fill="#0F9D58"/>
  <path d="M16 17.5C17.66 17.5 19 16.16 19 14.5C19 12.84 17.66 11.5 16 11.5C14.34 11.5 13 12.84 13 14.5C13 16.16 14.34 17.5 16 17.5Z" fill="white"/>
  <path d="M22 18.5H10C9.45 18.5 9 18.95 9 19.5C9 20.05 9.45 20.5 10 20.5H22C22.55 20.5 23 20.05 23 19.5C23 18.95 22.55 18.5 22 18.5Z" fill="white"/>
</svg>
```

### src\api\submitLead.ts
```ts
import { DiagnosisFormData, MiniFormData } from '../lib/schema';
import { saveLead } from '../lib/db';

export const submitMiniForm = async (data: MiniFormData) => {
  try {
    // Save to database
    const leadId = saveLead({
      name: data.name,
      phone: data.phone
    });
    
    // In a real app, you might want to send an email notification or integrate with a CRM
    console.log(`Lead saved with ID: ${leadId}`);
    
    return {
      success: true,
      leadId
    };
  } catch (error) {
    console.error('Error submitting mini form:', error);
    return {
      success: false,
      error: 'Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.'
    };
  }
};

export const submitDiagnosisForm = async (data: DiagnosisFormData) => {
  try {
    // Save to database
    const leadId = saveLead({
      name: data.name,
      phone: data.phone,
      cpf: data.cpf,
      benefitType: data.benefitType,
      problemType: data.problemType
    });
    
    // In a real app, you might want to send an email notification or integrate with a CRM
    console.log(`Lead saved with ID: ${leadId}`);
    
    return {
      success: true,
      leadId
    };
  } catch (error) {
    console.error('Error submitting diagnosis form:', error);
    return {
      success: false,
      error: 'Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.'
    };
  }
};
```

### src\App.tsx
```tsx
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrustBadges from './components/TrustBadges';
import HowItWorks from './components/HowItWorks';
import VideoSection from './components/VideoSection';
import BlogPreview from './components/BlogPreview';
import FAQSection from './components/FAQSection';
import LawyerProfiles from './components/LawyerProfiles';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <HowItWorks />
        <VideoSection />
        <BlogPreview />
        <FAQSection />
        <LawyerProfiles />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
```

### src\components\BlogPreview.tsx
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BlogPostProps {
  title: string;
  date: string;
  summary: string;
  image: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, summary, image, slug }) => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        
        <h3 className="text-xl font-semibold mb-3 text-secondary-700">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {summary}
        </p>
        
        <a 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600"
        >
          Ler artigo completo
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

const BlogPreview: React.FC = () => {
  const blogPosts = [
    {
      title: "Como Identificar Descontos Indevidos na Sua Aposentadoria do INSS",
      date: "01 de Junho, 2025",
      summary: "Aprenda a analisar seu extrato de pagamento e identificar descontos que podem estar sendo feitos sem sua autorização.",
      image: "https://images.pexels.com/photos/7821879/pexels-photo-7821879.jpeg",
      slug: "descontos-indevidos-inss"
    },
    {
      title: "Você Sabe o Que é a Restituição em Dobro e Quem Tem Direito?",
      date: "20 de Maio, 2025",
      summary: "Entenda como funciona a restituição em dobro garantida pelo Código de Defesa do Consumidor e quais aposentados têm direito.",
      image: "https://images.pexels.com/photos/6256083/pexels-photo-6256083.jpeg",
      slug: "direito-restituicao-dobro"
    },
    {
      title: "Guia Completo: Como Aposentados Podem Evitar Fraudes em Empréstimos Consignados",
      date: "10 de Maio, 2025",
      summary: "Dicas práticas para se proteger de golpes e fraudes relacionados a empréstimos consignados não autorizados.",
      image: "https://images.pexels.com/photos/6863251/pexels-photo-6863251.jpeg",
      slug: "evitar-fraudes-consignado"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Mantenha-se Informado: Artigos Exclusivos para Aposentados
        </h2>
        
        <p className="section-subtitle">
          Conteúdo atualizado sobre direitos, fraudes e benefícios do INSS.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogPost {...post} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <a 
            href="/blog"
            className="btn-secondary text-lg px-8 py-3 inline-flex items-center"
          >
            Ver Todos os Artigos
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
```

### src\components\DiagnosisForm.tsx
```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "Formato de telefone inválido"),
  cpf: z.string().optional(),
  benefitType: z.enum(['APOSENTADORIA', 'PENSAO', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de benefício" })
  }),
  problemType: z.enum(['EMPRESTIMO', 'DESCONTO', 'NAO_SEI', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de problema" })
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Você precisa concordar com os termos" })
  })
});

type FormData = z.infer<typeof formSchema>;

interface DiagnosisFormProps {
  onClose: () => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      benefitType: 'APOSENTADORIA',
      problemType: 'NAO_SEI',
      consent: false
    }
  });

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', data);
    
    // Show success state
    setIsSuccess(true);
  };

  const handleWhatsAppRedirect = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+restituição+em+dobro+dos+valores+indevidos+no+meu+benefício.`,
      '_blank'
    );
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-secondary-700">
              {isSuccess ? 'Solicitação Enviada!' : 'Diagnóstico Gratuito'}
            </h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            {!isSuccess ? (
              <>
                <p className="text-gray-600 mb-6">
                  Preencha e um especialista entrará em contato em breve. Seus dados 100% seguros.
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="modal-name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name')}
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="modal-phone" className="form-label">
                      WhatsApp
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone')}
                      disabled={isSubmitting}
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="modal-cpf" className="form-label">
                      CPF (opcional)
                    </label>
                    <input
                      id="modal-cpf"
                      type="text"
                      placeholder="000.000.000-00 (apenas números)"
                      className="form-input"
                      {...register('cpf')}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="modal-benefit-type" className="form-label">
                        Tipo de Benefício
                      </label>
                      <select
                        id="modal-benefit-type"
                        className={`form-select ${errors.benefitType ? 'border-red-500' : ''}`}
                        {...register('benefitType')}
                        disabled={isSubmitting}
                      >
                        <option value="APOSENTADORIA">Aposentadoria</option>
                        <option value="PENSAO">Pensão por Morte</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                      {errors.benefitType && <p className="form-error">{errors.benefitType.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="modal-problem-type" className="form-label">
                        Qual o problema?
                      </label>
                      <select
                        id="modal-problem-type"
                        className={`form-select ${errors.problemType ? 'border-red-500' : ''}`}
                        {...register('problemType')}
                        disabled={isSubmitting}
                      >
                        <option value="EMPRESTIMO">Empréstimo consignado não solicitado</option>
                        <option value="DESCONTO">Desconto de associação/sindicato indevido</option>
                        <option value="NAO_SEI">Não reconheço alguns descontos</option>
                        <option value="OUTRO">Outro</option>
                      </select>
                      {errors.problemType && <p className="form-error">{errors.problemType.message}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="form-checkbox mt-1"
                        {...register('consent')}
                        disabled={isSubmitting}
                      />
                      <span className="ml-2 text-gray-700">
                        Li e concordo em receber contato via WhatsApp para minha análise gratuita.{' '}
                        <a href="#" className="text-primary-500 hover:underline">
                          Política de Privacidade
                        </a>
                      </span>
                    </label>
                    {errors.consent && <p className="form-error">{errors.consent.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full btn-primary text-lg py-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'ENVIAR MEU DIAGNÓSTICO E FALAR AGORA'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-secondary-700 mb-4">
                  Seu pedido foi enviado com sucesso!
                </h3>
                
                <p className="text-gray-600 mb-8 text-lg">
                  Para agilizar, clique no botão abaixo e fale AGORA com um de nossos especialistas no WhatsApp.
                </p>
                
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="btn-whatsapp text-lg py-4 px-8"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                  Falar no WhatsApp Agora
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiagnosisForm;
```

### src\components\FAQSection.tsx
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border-b border-gray-200 last:border-none py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-secondary-700">
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-primary-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 text-primary-500 flex-shrink-0" />
        )}
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="py-4">
          <p className="text-gray-700">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqItems = [
    {
      question: "Quem tem direito à restituição em dobro?",
      answer: "Aposentados e pensionistas do INSS que tiveram descontos indevidos em seus benefícios têm direito à restituição em dobro. Isso inclui empréstimos consignados não autorizados, descontos de associações ou sindicatos sem consentimento, e outros valores cobrados sem justificativa legal."
    },
    {
      question: "Quanto tempo leva o processo para reaver o dinheiro?",
      answer: "O tempo para receber a restituição varia conforme a complexidade do caso. Geralmente, casos mais simples podem ser resolvidos em 3 a 6 meses. Processos que exigem ações judiciais podem levar de 1 a 2 anos. Nossa equipe trabalha para agilizar ao máximo cada etapa."
    },
    {
      question: "Preciso pagar algo adiantado para a análise do meu caso?",
      answer: "Não! Nossa análise inicial é 100% gratuita e sem compromisso. Só haverá cobrança de honorários quando você efetivamente receber sua restituição. Não cobramos nenhum valor adiantado para analisar seu caso ou iniciar o processo."
    },
    {
      question: "Como sei se realmente tenho descontos indevidos?",
      answer: "Você pode verificar no extrato de pagamento do seu benefício, disponível no aplicativo ou site Meu INSS, ou no extrato bancário onde recebe o benefício. Qualquer desconto que você não reconheça ou não tenha autorizado pode ser indevido. Nossa análise gratuita também ajuda a identificar esses descontos."
    },
    {
      question: "O que devo fazer após descobrir um desconto indevido?",
      answer: "Entre em contato conosco imediatamente através do WhatsApp ou formulário do site. Quanto antes iniciarmos o processo, mais rápido você poderá receber sua restituição. É importante não autorizar novos descontos e guardar extratos e comprovantes de pagamento."
    },
    {
      question: "Posso fazer o processo sozinho ou preciso de um advogado?",
      answer: "Embora seja possível tentar resolver administrativamente, a presença de um advogado especializado aumenta significativamente as chances de sucesso e agiliza o processo. Para a restituição em dobro, geralmente é necessária ação judicial, onde a representação por advogado é obrigatória."
    },
    {
      question: "Qual a diferença entre restituição simples e em dobro?",
      answer: "A restituição simples devolve exatamente o valor descontado indevidamente. Já a restituição em dobro, garantida pelo Código de Defesa do Consumidor, devolve o dobro do valor cobrado indevidamente, como forma de compensação pelo dano sofrido pelo consumidor."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Perguntas Frequentes: Respostas Simples para Suas Dúvidas
        </h2>
        
        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-card p-6 md:p-8">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question} 
              answer={item.answer} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl mb-6">
            Ainda tem dúvidas? Fale diretamente com nossos especialistas.
          </p>
          
          <a 
            href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Tenho+dúvidas+sobre+a+restituição+em+dobro+e+gostaria+de+mais+informações."
            className="btn-whatsapp text-lg px-8 py-4 inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
            </svg>
            Tire Suas Dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
```

### src\components\Footer.tsx
```tsx
import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              Restituição<span className="text-primary-400">EmDobro</span>
            </h3>
            
            <p className="mb-6">
              Especialistas em recuperar valores descontados indevidamente em benefícios do INSS, com a restituição em dobro garantida por lei.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              
              <a 
                href="#" 
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              
              <a 
                href="#" 
                className="text-white hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Contato</h4>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <a 
                  href="tel:+5565992918889" 
                  className="hover:text-primary-400 transition-colors"
                >
                  (65) 99291-8889
                </a>
              </li>
              
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:contato@restituicaoemdobro.com.br" 
                  className="hover:text-primary-400 transition-colors"
                >
                  contato@restituicaoemdobro.com.br
                </a>
              </li>
              
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <address className="not-italic">
                  Av. Paulista, 1000, São Paulo - SP
                </address>
              </li>
              
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-primary-400 mr-3 mt-1 flex-shrink-0" />
                <p>Segunda a Sexta: 8h às 18h</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Links Rápidos</h4>
            
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Vídeos Explicativos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Nossos Especialistas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Informações Legais</h4>
            
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Aviso Legal
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Restituição em Dobro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### src\components\Header.tsx
```tsx
import React from 'react';
import { Phone, Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-500">
              Restituição<span className="text-primary-500">EmDobro</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-primary-500 mr-2" />
              <a 
                href="tel:+5565992918889" 
                className="text-lg hover:text-primary-500 transition-colors"
              >
                (65) 99291-8889
              </a>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-lg">Seg-Sex: 8h às 18h</span>
            </div>
            
            <a 
              href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar Agora
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### src\components\HeroSection.tsx
```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Users, TrendingUp } from 'lucide-react';
import DiagnosisForm from './DiagnosisForm';

const MiniFormSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  phone: z.string().min(10, "Digite seu WhatsApp")
});

type MiniFormData = z.infer<typeof MiniFormSchema>;

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting }
  } = useForm<MiniFormData>({
    resolver: zodResolver(MiniFormSchema)
  });

  const onSubmit = async (data: MiniFormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would save this data to your database
    console.log('Form submitted:', data);
    
    // Reset form and show success state
    reset();
    setSubmitted(true);
    
    // Redirect to WhatsApp after short delay
    setTimeout(() => {
      window.open(
        `https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Meu+nome+é+${data.name}.+Gostaria+de+saber+mais+sobre+a+restituição+em+dobro+dos+valores+indevidos+no+meu+benefício.`,
        '_blank'
      );
    }, 1500);
  };

  return (
    <section className="relative bg-hero-pattern bg-cover bg-center py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              APOSENTADO(A): Recupere em DOBRO os Valores Descontados Ilegalmente do Seu Benefício!
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-6">
              Descubra seu direito à restituição em dobro com nossa análise gratuita e segura.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.div 
                className="flex items-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Users className="h-6 w-6 mr-2 text-primary-400" />
                <span className="text-lg">+5.000 Aposentados Atendidos</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TrendingUp className="h-6 w-6 mr-2 text-primary-400" />
                <span className="text-lg">+12 Milhões Recuperados</span>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
                className="btn-primary text-lg px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                QUERO MINHA RESTITUIÇÃO AGORA!
              </a>
              
              <button 
                className="btn-secondary bg-white/90 text-lg px-8 py-4"
                onClick={() => setIsModalOpen(true)}
              >
                Fazer Diagnóstico Gratuito Online
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-secondary-700 mb-4">
                  Análise Gratuita e Rápida
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Preencha para descobrir se você tem direito à restituição em dobro:
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                      Seu Nome Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name')}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="form-label">
                      Seu WhatsApp
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      {...register('phone')}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full btn-primary text-lg py-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Iniciar Análise Gratuita'}
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Seus dados estão seguros e protegidos.
                  </p>
                </form>
              </>
            ) : (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-secondary-700 mb-2">
                  Solicitação Enviada!
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Estamos redirecionando você para o WhatsApp para continuar o atendimento.
                </p>
                
                <p className="text-primary-500 font-semibold">
                  Aguarde um momento...
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {isModalOpen && (
        <DiagnosisForm onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
};

export default HeroSection;
```

### src\components\HowItWorks.tsx
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Coins } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: <MessageSquare className="h-12 w-12 text-white" />,
      title: "Contato Rápido",
      description: "Fale conosco ou preencha o formulário para uma análise inicial gratuita."
    },
    {
      number: 2,
      icon: <FileText className="h-12 w-12 text-white" />,
      title: "Análise e Documentação",
      description: "Identificamos os descontos indevidos e cuidamos da burocracia para você."
    },
    {
      number: 3,
      icon: <Coins className="h-12 w-12 text-white" />,
      title: "Receba em Dobro",
      description: "Acompanhe o processo e receba o valor corrigido da sua restituição."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Seu Caminho para a Restituição em 3 Passos Simples
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-secondary-500 flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-24 w-full h-0.5 bg-gray-200"></div>
                )}
              </div>
              
              <h3 className="text-2xl font-semibold mb-3 text-secondary-700">
                {step.title}
              </h3>
              
              <p className="text-gray-600 max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
            className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
            </svg>
            QUERO INICIAR MINHA RESTITUIÇÃO
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
```

### src\components\LawyerProfiles.tsx
```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface LawyerProfileProps {
  name: string;
  title: string;
  bio: string;
  image: string;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ name, title, bio, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <img 
        src={image} 
        alt={`Dr. ${name}`}
        className="w-full h-64 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-secondary-700">
          Dr. {name}
        </h3>
        
        <p className="text-primary-500 font-semibold mb-4">
          {title}
        </p>
        
        <p className="text-gray-600">
          {bio}
        </p>
      </div>
    </div>
  );
};

const LawyerProfiles: React.FC = () => {
  const lawyers = [
    {
      name: "Carlos Mendes",
      title: "Especialista em Direito Previdenciário",
      bio: "Advogado com mais de 15 anos de experiência em direito previdenciário, especializado em restituição de valores indevidos para aposentados. Já recuperou mais de R$ 5 milhões para seus clientes.",
      image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg"
    },
    {
      name: "Ana Paula Silva",
      title: "Especialista em Direito do Consumidor",
      bio: "Formada com honras pela USP, com pós-graduação em Direito do Consumidor. Atua há 10 anos defendendo os direitos de aposentados, com especialização em restituição em dobro de valores.",
      image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg"
    },
    {
      name: "Roberto Almeida",
      title: "Especialista em Conciliação",
      bio: "Advogado com formação em mediação e conciliação, especializado em resolver casos de forma rápida e eficiente. Atendimento humanizado, com foco na explicação clara de todas as etapas do processo.",
      image: "https://images.pexels.com/photos/8117689/pexels-photo-8117689.jpeg"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Sua Equipe de Especialistas: Confiabilidade e Experiência
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {lawyers.map((lawyer, index) => (
            <motion.div key={index} variants={itemVariants}>
              <LawyerProfile {...lawyer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LawyerProfiles;
```

### src\components\TrustBadges.tsx
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Search, 
  UserCheck, 
  TrendingUp,
  Star
} from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badgeItems = [
    {
      icon: <Award className="h-10 w-10 text-primary-500" />,
      title: "Experiência Comprovada",
      description: "Anos de atuação focada em direito previdenciário."
    },
    {
      icon: <Search className="h-10 w-10 text-primary-500" />,
      title: "Análise 100% Gratuita",
      description: "Sem letras miúdas ou surpresas."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary-500" />,
      title: "Atendimento Humanizado",
      description: "Nossos especialistas falam a sua língua."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary-500" />,
      title: "Resultados Garantidos",
      description: "Lutamos pelo seu direito de restituição em dobro."
    },
    {
      icon: <Star className="h-10 w-10 text-primary-500" />,
      title: "Reputação Sólida",
      description: "Avaliação 4.8★ no Reclame Aqui e Google."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700 mb-12">
          Sua Segurança e Confiança em Primeiro Lugar
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {badgeItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center">
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-secondary-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-xl font-semibold mb-6 text-center text-secondary-700">
            O Que Nossos Clientes Dizem
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Maria Aparecida, 68 anos"
              text="Recuperei mais de R$ 8.500 que haviam descontado do meu benefício sem minha autorização. O atendimento foi excelente e não precisei me preocupar com nada!"
              rating={5}
            />
            
            <TestimonialCard 
              name="José Carlos, 72 anos"
              text="Eu nem sabia que tinha tantos descontos indevidos. Graças à análise gratuita, descobri que tinha direito à restituição em dobro. Já recebi o valor e estou muito satisfeito."
              rating={5}
            />
            
            <TestimonialCard 
              name="Antônia Silva, 65 anos"
              text="Fiquei receosa no início, mas o atendimento foi muito atencioso. Explicaram tudo com paciência e conseguiram recuperar valores que eu nem sabia que tinha direito."
              rating={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, text, rating }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border border-gray-100">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4">"{text}"</p>
      <p className="font-semibold text-secondary-700">{name}</p>
    </div>
  );
};

export default TrustBadges;
```

### src\components\VideoSection.tsx
```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoItemProps {
  title: string;
  thumbnail: string;
  description: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ title, thumbnail, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {!isPlaying ? (
        <div 
          className="relative cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
            <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
          <p className="text-white">Vídeo seria carregado aqui.</p>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-secondary-700">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

const VideoSection: React.FC = () => {
  const videos = [
    {
      title: "Como identificar descontos indevidos no seu benefício?",
      thumbnail: "https://images.pexels.com/photos/7551592/pexels-photo-7551592.jpeg",
      description: "Neste vídeo, explicamos como verificar seu extrato de pagamento do INSS e identificar descontos que podem estar sendo aplicados sem sua autorização."
    },
    {
      title: "A restituição em dobro: O que a lei diz?",
      thumbnail: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg",
      description: "Entenda seus direitos conforme o Código de Defesa do Consumidor e como a lei garante a devolução em dobro de valores cobrados indevidamente."
    },
    {
      title: "Nosso processo: Como funciona o atendimento?",
      thumbnail: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg",
      description: "Conheça cada etapa do nosso processo, desde o primeiro contato até o recebimento da sua restituição, com atendimento personalizado e humanizado."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-secondary-700">
          Tire Suas Dúvidas: Vídeos Curtos e Descomplicados
        </h2>
        
        <p className="section-subtitle">
          Assista e entenda seus direitos sobre descontos indevidos e restituição.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videos.map((video, index) => (
            <motion.div key={index} variants={itemVariants}>
              <VideoItem 
                title={video.title} 
                thumbnail={video.thumbnail} 
                description={video.description} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
```

### src\components\WhatsAppButton.tsx
```tsx
import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href="https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+redução+de+dívidas+e+a+restituição+em+dobro+dos+valores+indevidos."
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.3,
          delay: 1
        }
      }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <div className="flex items-center">
          <svg className="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
          </svg>
          <span className="font-semibold text-lg hidden md:block">Fale Agora!</span>
        </div>
      </motion.div>
    </motion.a>
  );
};

export default WhatsAppButton;
```

### src\index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Open Sans', system-ui, sans-serif;
    @apply text-gray-800;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', system-ui, sans-serif;
    @apply font-bold text-blue-800;
  }
  
  p, li {
    @apply text-lg leading-relaxed;
  }
  
  @media (max-width: 640px) {
    p, li {
      @apply text-base;
    }
  }
  
  body {
    @apply bg-gray-50;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply btn bg-green-600 hover:bg-green-700 text-white focus:ring-green-500;
  }
  
  .btn-secondary {
    @apply btn border-2 border-blue-800 text-blue-800 hover:bg-blue-50 focus:ring-blue-500;
  }
  
  .btn-whatsapp {
    @apply btn bg-green-500 hover:bg-green-600 text-white focus:ring-green-400;
  }
  
  .container-custom {
    @apply container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }
  
  .section {
    @apply py-12 md:py-16 lg:py-20;
  }
  
  .section-title {
    @apply text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-10 text-center;
  }
  
  .section-subtitle {
    @apply text-xl md:text-2xl text-center text-gray-600 mb-8 lg:mb-12 max-w-3xl mx-auto;
  }
  
  .form-label {
    @apply block text-lg font-semibold mb-2 text-gray-700;
  }
  
  .form-input {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg;
  }
  
  .form-select {
    @apply form-input appearance-none bg-white;
  }
  
  .form-checkbox {
    @apply w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500;
  }
  
  .form-error {
    @apply text-red-600 mt-1 text-sm;
  }
}
```

### src\lib\data.ts
```ts
export const blogPosts = [
  {
    title: "Como Identificar Descontos Indevidos na Sua Aposentadoria do INSS",
    date: "01 de Junho, 2025",
    summary: "Aprenda a analisar seu extrato de pagamento e identificar descontos que podem estar sendo feitos sem sua autorização.",
    content: `
      # Como Identificar Descontos Indevidos na Sua Aposentadoria do INSS

      Se você é aposentado ou pensionista do INSS, é importante verificar regularmente seu extrato de pagamento para identificar possíveis descontos indevidos. Muitos beneficiários têm sofrido com cobranças não autorizadas, que diminuem significativamente o valor recebido mensalmente.

      ## O que são descontos indevidos?

      Descontos indevidos são valores subtraídos do seu benefício sem a sua autorização expressa. Os mais comuns incluem:

      - Empréstimos consignados que você não solicitou
      - Taxas de associações ou sindicatos que você não autorizou
      - Seguros e planos que foram incluídos sem seu consentimento
      - Serviços diversos que aparecem no extrato sem explicação

      ## Como verificar seu extrato de pagamento

      Existem várias formas de verificar o extrato do seu benefício:

      1. **Aplicativo Meu INSS**: Baixe o aplicativo, faça login com sua conta gov.br e acesse a seção "Extrato de Pagamento"
      2. **Site do INSS**: Acesse [meu.inss.gov.br](https://meu.inss.gov.br) e navegue até "Extrato de Pagamento"
      3. **Caixa eletrônico**: Utilize o caixa eletrônico do banco onde recebe seu benefício
      4. **Extrato bancário**: Verifique o valor creditado em sua conta e compare com o valor bruto do benefício

      ## O que fazer ao identificar um desconto indevido

      Se você identificou algum desconto que não reconhece, siga estes passos:

      1. Anote todos os descontos suspeitos, com valores e datas
      2. Reúna extratos anteriores para verificar desde quando o desconto está sendo aplicado
      3. Entre em contato conosco pelo WhatsApp (65) 99291-8889 para uma análise gratuita
      4. Não autorize novos descontos ou empréstimos até que a situação seja esclarecida

      ## Seu direito à restituição em dobro

      Você sabia que, segundo o Código de Defesa do Consumidor, tem direito a receber em dobro qualquer valor cobrado indevidamente? Isso significa que, além de recuperar o que foi descontado sem autorização, você pode receber o mesmo valor como compensação pelo dano sofrido.

      [QUERO VERIFICAR SE TENHO DIREITO À RESTITUIÇÃO EM DOBRO](https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+restituição+em+dobro+dos+valores+indevidos+no+meu+benefício.)

      Não deixe que descontos indevidos reduzam sua aposentadoria. Faça uma verificação regular e garanta que está recebendo o valor correto do seu benefício.
    `,
    image: "https://images.pexels.com/photos/7821879/pexels-photo-7821879.jpeg",
    slug: "descontos-indevidos-inss"
  },
  {
    title: "Você Sabe o Que é a Restituição em Dobro e Quem Tem Direito?",
    date: "20 de Maio, 2025",
    summary: "Entenda como funciona a restituição em dobro garantida pelo Código de Defesa do Consumidor e quais aposentados têm direito.",
    content: `
      # Você Sabe o Que é a Restituição em Dobro e Quem Tem Direito?

      A restituição em dobro é um direito garantido por lei aos consumidores brasileiros, incluindo aposentados e pensionistas que tiveram valores descontados indevidamente de seus benefícios. Mas você sabe exatamente como funciona esse direito e quem pode solicitá-lo?

      ## O que é a restituição em dobro?

      A restituição em dobro está prevista no artigo 42, parágrafo único, do Código de Defesa do Consumidor (CDC), que determina:

      > "O consumidor cobrado em quantia indevida tem direito à repetição do indébito, por valor igual ao dobro do que pagou em excesso, acrescido de correção monetária e juros legais, salvo hipótese de engano justificável."

      Em termos simples, isso significa que se alguma empresa ou instituição cobrou você indevidamente, você tem direito a receber de volta não apenas o que foi cobrado, mas o dobro desse valor.

      ## Quem tem direito à restituição em dobro?

      Para ter direito à restituição em dobro, é necessário que:

      1. Tenha havido uma cobrança indevida (sem autorização)
      2. A cobrança tenha sido efetivamente descontada do seu benefício
      3. Não se trate de um "engano justificável" por parte de quem fez a cobrança

      No caso específico de aposentados e pensionistas do INSS, têm direito aqueles que:

      - Tiveram empréstimos consignados não solicitados
      - Sofreram descontos de associações ou sindicatos sem autorização
      - Pagaram por seguros ou serviços que não contrataram
      - Identificaram qualquer outro desconto não autorizado em seu benefício

      ## Como solicitar a restituição em dobro?

      O processo para solicitar a restituição em dobro envolve:

      1. **Identificação dos descontos**: Analisar extratos para identificar todos os valores cobrados indevidamente
      2. **Documentação**: Reunir provas de que não houve autorização para os descontos
      3. **Notificação**: Comunicar formalmente a instituição responsável pelos descontos
      4. **Ação judicial**: Na maioria dos casos, é necessário ingressar com uma ação judicial

      Por envolver questões jurídicas complexas, o apoio de especialistas em direito previdenciário e do consumidor é fundamental para garantir o sucesso do processo.

      ## Por que muitos aposentados não conseguem a restituição sozinhos?

      Muitos aposentados tentam resolver a questão diretamente com os bancos ou financeiras, mas encontram dificuldades como:

      - Burocracia excessiva
      - Falta de conhecimento técnico sobre os direitos
      - Dificuldade em comprovar a ausência de autorização
      - Resistência das instituições em reconhecer o erro

      É por isso que contar com apoio especializado aumenta significativamente as chances de sucesso.

      [QUERO VERIFICAR SE TENHO DIREITO À RESTITUIÇÃO EM DOBRO](https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+saber+mais+sobre+a+restituição+em+dobro+dos+valores+indevidos+no+meu+benefício.)

      Não deixe de buscar seus direitos! A restituição em dobro não é apenas uma compensação financeira, mas uma forma de fazer justiça e coibir práticas abusivas contra aposentados e pensionistas.
    `,
    image: "https://images.pexels.com/photos/6256083/pexels-photo-6256083.jpeg",
    slug: "direito-restituicao-dobro"
  },
  {
    title: "Guia Completo: Como Aposentados Podem Evitar Fraudes em Empréstimos Consignados",
    date: "10 de Maio, 2025",
    summary: "Dicas práticas para se proteger de golpes e fraudes relacionados a empréstimos consignados não autorizados.",
    content: `
      # Guia Completo: Como Aposentados Podem Evitar Fraudes em Empréstimos Consignados

      Os empréstimos consignados são uma das principais modalidades de crédito para aposentados e pensionistas, oferecendo taxas de juros mais baixas que as praticadas no mercado. No entanto, também se tornaram alvo frequente de golpistas e de práticas abusivas. Neste guia, apresentamos medidas práticas para proteger seu benefício.

      ## Tipos comuns de fraudes em empréstimos consignados

      1. **Empréstimos não solicitados**: Valores depositados em sua conta sem seu pedido, gerando descontos mensais no benefício
      2. **Vendas casadas**: Quando condicionam a liberação do empréstimo à contratação de seguros ou outros serviços
      3. **Contratos com informações falsas**: Documentos com valores diferentes dos acordados verbalmente
      4. **Golpes por telefone**: Ligações solicitando dados pessoais para "liberar" supostos empréstimos
      5. **Falsificação de documentos**: Uso de documentos falsificados para contratar empréstimos em seu nome

      ## Como se proteger de fraudes e golpes

      ### Antes de contratar qualquer empréstimo:

      - **Nunca forneça dados pessoais por telefone**, mesmo que a pessoa se identifique como funcionário do banco ou do INSS
      - **Desconfie de ofertas muito vantajosas** ou que pressionam por decisões imediatas
      - **Leia atentamente todo o contrato** antes de assinar
      - **Verifique a reputação da instituição** financeira em sites como Reclame Aqui e Procon
      - **Leve alguém de confiança** quando for assinar contratos importantes
      - **Consulte o extrato do benefício regularmente** pelo aplicativo Meu INSS

      ### Se identificar um empréstimo não autorizado:

      1. **Registre um boletim de ocorrência** na delegacia mais próxima
      2. **Entre em contato com o INSS** pelo telefone 135
      3. **Solicite o bloqueio de novos empréstimos consignados** no aplicativo Meu INSS
      4. **Notifique o banco ou financeira** por escrito, preferencialmente com aviso de recebimento
      5. **Procure orientação jurídica especializada** para solicitar a restituição em dobro dos valores

      ## Como bloquear novos empréstimos consignados

      O INSS oferece a opção de bloquear a contratação de novos empréstimos consignados. Para isso:

      1. Acesse o aplicativo ou site Meu INSS
      2. Faça login com sua conta gov.br
      3. No menu, selecione "Bloqueio de Empréstimos Consignados"
      4. Confirme a solicitação

      Essa medida impede que novos empréstimos sejam registrados em seu benefício, oferecendo uma camada adicional de segurança.

      ## Cuidado com intermediários e correspondentes bancários

      Muitas fraudes ocorrem por meio de intermediários que se apresentam como representantes de bancos. Recomendamos:

      - Priorizar o atendimento direto nas agências bancárias
      - Verificar se o correspondente bancário está autorizado pelo Banco Central
      - Não assinar documentos em branco ou sem ler completamente
      - Solicitar sempre uma cópia do contrato assinado

      [ACHO QUE FUI VÍTIMA DE FRAUDE. QUERO AJUDA ESPECIALIZADA](https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Acho+que+fui+vítima+de+fraude+em+empréstimo+consignado+e+gostaria+de+ajuda.)

      A informação é sua melhor proteção contra fraudes. Mantenha-se atento, verifique regularmente seu benefício e não hesite em buscar ajuda especializada se identificar qualquer irregularidade.
    `,
    image: "https://images.pexels.com/photos/6863251/pexels-photo-6863251.jpeg",
    slug: "evitar-fraudes-consignado"
  },
  {
    title: "Nova Lei da Aposentadoria 2025: O Que Mudou e Seus Direitos",
    date: "25 de Abril, 2025",
    summary: "Confira as principais mudanças na legislação previdenciária e como elas podem afetar seus direitos como aposentado ou pensionista.",
    content: `
      # Nova Lei da Aposentadoria 2025: O Que Mudou e Seus Direitos

      As regras da Previdência Social no Brasil passam por constantes atualizações, e é fundamental que aposentados e pensionistas se mantenham informados sobre essas mudanças para garantir que seus direitos sejam respeitados. Neste artigo, explicamos as principais alterações recentes e como elas podem afetar você.

      ## Principais mudanças na legislação previdenciária

      ### 1. Proteção contra descontos indevidos

      Uma das mudanças mais significativas foi o fortalecimento das regras contra descontos não autorizados em benefícios previdenciários. A nova legislação:

      - Estabelece limites mais rígidos para a oferta de empréstimos consignados
      - Exige autorização expressa e verificável do beneficiário para qualquer desconto
      - Aumenta as penalidades para instituições que realizarem cobranças indevidas
      - Simplifica o processo de contestação e bloqueio de novos descontos

      ### 2. Novas regras para empréstimos consignados

      O governo estabeleceu novas diretrizes para empréstimos consignados, incluindo:

      - Redução do teto de juros permitidos
      - Aumento do prazo máximo para quitação
      - Limite de comprometimento da renda reduzido de 35% para 30%
      - Período de carência obrigatório entre a concessão do benefício e o primeiro empréstimo

      ### 3. Restituição de valores indevidos

      Foi reforçado o direito à restituição em dobro de valores descontados indevidamente, com:

      - Simplificação do processo administrativo para solicitação da restituição
      - Prazo máximo de 60 dias para análise e resposta das instituições financeiras
      - Possibilidade de bloqueio preventivo de novos descontos durante a análise

      ## Como essas mudanças afetam seus direitos

      ### Para quem já está aposentado:

      - Maior proteção contra descontos não autorizados
      - Processo mais simples para contestar cobranças indevidas
      - Direito à restituição em dobro mantido e fortalecido
      - Possibilidade de renegociação de empréstimos existentes com as novas taxas

      ### Para quem está prestes a se aposentar:

      - Novas regras de transição para cálculo do benefício
      - Período de proteção contra ofertas de empréstimos nos primeiros meses
      - Orientação obrigatória sobre consignados antes da contratação

      ## O que fazer para garantir seus direitos

      1. **Mantenha seus dados atualizados** no cadastro do INSS
      2. **Verifique regularmente o extrato do benefício** para identificar descontos indevidos
      3. **Ative o bloqueio preventivo** se não tiver interesse em contratar empréstimos
      4. **Guarde todos os contratos e comprovantes** relacionados a empréstimos e serviços
      5. **Busque orientação especializada** ao identificar cobranças suspeitas

      ## Prazos importantes para ficar atento

      - **5 anos** é o prazo prescricional para solicitar a restituição de valores descontados indevidamente
      - **60 dias** é o novo prazo máximo para resposta das instituições financeiras às reclamações
      - **30 dias** é o período em que seu pedido de bloqueio de novos empréstimos deve ser processado

      [QUERO VERIFICAR SE TENHO DIREITOS NÃO RECONHECIDOS](https://api.whatsapp.com/send/?phone=5565992918889&text=Olá!+Gostaria+de+verificar+se+tenho+direitos+não+reconhecidos+após+as+novas+mudanças+na+legislação.)

      Fique atento às mudanças na legislação previdenciária e não deixe de buscar orientação especializada para garantir que todos os seus direitos sejam respeitados!
    `,
    image: "https://images.pexels.com/photos/7821771/pexels-photo-7821771.jpeg",
    slug: "nova-lei-aposentadoria"
  }
];
```

### src\lib\db.ts
```ts
import Database from 'better-sqlite3';

// Create a new database connection
const db = new Database(':memory:'); // Using in-memory SQLite for Bolt.new compatibility

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    cpf TEXT,
    benefitType TEXT,
    problemType TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create a function to save leads
export const saveLead = (lead: {
  name: string;
  phone: string;
  cpf?: string;
  benefitType?: string;
  problemType?: string;
}) => {
  const stmt = db.prepare(`
    INSERT INTO leads (name, phone, cpf, benefitType, problemType)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const info = stmt.run(
    lead.name,
    lead.phone,
    lead.cpf || null,
    lead.benefitType || null,
    lead.problemType || null
  );
  
  return info.lastInsertRowid;
};

// Create a function to get all leads
export const getLeads = () => {
  const stmt = db.prepare('SELECT * FROM leads ORDER BY createdAt DESC');
  return stmt.all();
};

export default db;
```

### src\lib\schema.ts
```ts
import { z } from 'zod';

export const miniFormSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  phone: z.string().min(10, "Digite seu WhatsApp")
});

export type MiniFormData = z.infer<typeof miniFormSchema>;

export const diagnosisFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "Formato de telefone inválido"),
  cpf: z.string().optional(),
  benefitType: z.enum(['APOSENTADORIA', 'PENSAO', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de benefício" })
  }),
  problemType: z.enum(['EMPRESTIMO', 'DESCONTO', 'NAO_SEI', 'OUTRO'], {
    errorMap: () => ({ message: "Selecione o tipo de problema" })
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Você precisa concordar com os termos" })
  })
});

export type DiagnosisFormData = z.infer<typeof diagnosisFormSchema>;

export const blogPostSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  image: z.string(),
  slug: z.string()
});

export type BlogPost = z.infer<typeof blogPostSchema>;
```

### src\main.tsx
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

```

### src\vite-env.d.ts
```ts
/// <reference types="vite/client" />

```

### tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#E6F7EF',
          100: '#C3EBD7',
          200: '#9DDEBF',
          300: '#77D1A6',
          400: '#4FC48E',
          500: '#0F9D58', // Primary green
          600: '#0C7D46',
          700: '#095E34',
          800: '#063E22',
          900: '#031F11',
        },
        'secondary': {
          50: '#ECEEF9',
          100: '#CED3EF',
          200: '#B1B8E5',
          300: '#939DDC',
          400: '#7582D2',
          500: '#3F51B5', // Secondary blue
          600: '#324191',
          700: '#26306D',
          800: '#192048',
          900: '#0D1024',
        },
      },
      fontFamily: {
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
        'body': ['Open Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg')",
      },
    },
  },
  plugins: [],
};
```

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

### vite.config.ts
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

```

