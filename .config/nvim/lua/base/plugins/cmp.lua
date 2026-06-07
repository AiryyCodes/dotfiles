return
{
    "hrsh7th/nvim-cmp",
    dependencies = {
        "hrsh7th/cmp-nvim-lsp",
        "hrsh7th/cmp-buffer",
        "hrsh7th/cmp-path",
        "hrsh7th/cmp-cmdline",
    },
    config = function()
        local cmp = require("cmp")
        local luasnip = require("luasnip")
        local lspkind = require("lspkind")

        cmp.setup({
            snippet = {
                expand = function(args)
                    luasnip.lsp_expand(args.body)
                end,
            },
            window = {
                completion = {
                    winhighlight =
                    "Normal:TelescopePromptNormal,CursorLine:Visual,Search:None,FloatBorder:TelescopePromptNormal",
                    col_offset = 0,
                    side_padding = 0,
                    scrollbar = false,
                },
                documentation = {
                    border = { " ", " ", " ", " ", " ", " ", " ", " " },
                    winhighlight = "Normal:TelescopeNormal,FloatBorder:TelescopeNormal",
                },
            },
            formatting = {
                fields = { "kind", "abbr", "menu" },
                format = function(_, item)
                    local icons = require("base.icons")
                    local icon = icons[item.kind]

                    icon = " " .. icon .. " "
                    item.menu = "   " .. item.kind .. ""
                    item.kind = icon

                    return item
                end,
            },
            mapping = cmp.mapping.preset.insert({
                ["<C-u>"] = cmp.mapping.scroll_docs(-4), -- Up
                ["<C-d>"] = cmp.mapping.scroll_docs(4),  -- Down
                -- C-b (back) C-f (forward) for snippet placeholder navigation.
                ["<C-Space>"] = cmp.mapping.complete(),
                ["<CR>"] = cmp.mapping.confirm({
                    behavior = cmp.ConfirmBehavior.Replace,
                    select = true,
                }),
                ["<Tab>"] = cmp.mapping(function(fallback)
                    if cmp.visible() then
                        cmp.select_next_item()
                    elseif luasnip.expand_or_jumpable() then
                        luasnip.expand_or_jump()
                    else
                        fallback()
                    end
                end, { "i", "s" }),
                ["<S-Tab>"] = cmp.mapping(function(fallback)
                    if cmp.visible() then
                        cmp.select_prev_item()
                    elseif luasnip.jumpable(-1) then
                        luasnip.jump(-1)
                    else
                        fallback()
                    end
                end, { "i", "s" }),
            }),
            sources = {
                { name = "nvim_lsp" },
                { name = "luasnip" },
            },
        })
    end,
}
