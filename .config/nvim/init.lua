require("config.lazy")

vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1

-- Enable 24-bit color
vim.opt.termguicolors = true

vim.opt.tabstop = 4
vim.opt.shiftwidth = 4

vim.opt.number = true

vim.opt.clipboard = 'unnamedplus'
vim.opt.fillchars = { eob = " " }

vim.cmd.colorscheme('onedark')

vim.api.nvim_set_hl(0, "LazyButton", { bg = "#14181d" })
vim.api.nvim_set_hl(0, "LazyNormal", { bg = "#14181d" })
vim.api.nvim_set_hl(0, "FloatBorder", { bg = "#14181d" })

vim.cmd([[autocmd BufNewFile,BufRead *.vert,*.frag :set filetype=glsl]])
