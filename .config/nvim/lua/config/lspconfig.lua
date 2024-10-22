local lspconfig = require 'lspconfig'
local capabilities = require 'cmp_nvim_lsp'.default_capabilities()


lspconfig['clangd'].setup({
	capabilities = capabilities
})

lspconfig['lua_ls'].setup({
	capabilities = capabilities
})

lspconfig['glsl_analyzer'].setup({
	capabilities = capabilities
})

lspconfig['cmake'].setup({
	capabilities = capabilities
})

lspconfig['csharp_ls'].setup({
	capabilities = capabilities
})

lspconfig['ts_ls'].setup({
	capabilities = capabilities
})
