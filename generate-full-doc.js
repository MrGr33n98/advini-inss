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