local tree = require 'nvim-tree'

tree.setup({
    filters = {
        dotfiles = true,
    },
	view = {
		width = 50,
	},
})

local api = require 'nvim-tree.api'
vim.keymap.set('n', '<C-b>', api.tree.toggle, {})
