import os
import mkdocs_gen_files

# 遍历 docs 目录
for root, dirs, files in os.walk("docs"):
    # 找出当前目录下所有的 Markdown 文件（忽略可能已手写的 index.md）
    md_files = [f for f in files if f.endswith(".md") and f != "index.md"]

    if md_files:
        # 获取当前文件夹的名字作为标题
        folder_name = os.path.basename(root)
        if folder_name == "docs":
            folder_name = "首页"

        # 计算出该文件夹下 index.md 的相对路径
        virtual_path = os.path.relpath(os.path.join(root, "index.md"), "docs")

        # 动态生成文件内容
        with mkdocs_gen_files.open(virtual_path, "w") as f:
            f.write(f"# {folder_name} 目录索引\n\n")
            for md in sorted(md_files):
                # 去掉扩展名作为显示的链接文字
                title = md.replace(".md", "")
                f.write(f"- [{title}]({md})\n")