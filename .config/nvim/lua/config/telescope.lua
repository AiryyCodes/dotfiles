local telescope = require 'telescope'
local builtin = require 'telescope.builtin'

telescope.setup {
	defaults = {
		file_ignore_patterns = {
			"build/",
			"ext/"
		}
	},
}

vim.keymap.set('n', '<C-f>', builtin.find_files, { desc = 'Telescope find files' })
vim.keymap.set('n', '<C-h>', builtin.live_grep, { desc = 'Telescope live grep' })
