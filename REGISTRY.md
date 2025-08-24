# Registry Management

This project includes an automated CLI script to generate and maintain the component registry.

## Auto-Generate Registry

### Quick Commands

```bash
# Generate/update all registry files
pnpm run generate-registry

# Alternative alias
pnpm run registry:update
```

### What It Does

The CLI script automatically:

1. **Scans your component directories**:
   - `components/Data/` → Data components  
   - `components/Form/` → Form components
   - `components/Navigation/` → Navigation components
   - `components/Modal/` → Modal components

2. **Scans your hooks directory**:
   - `hooks/` → All custom React hooks

3. **Generates registry files**:
   - Individual JSON files for each component/hook
   - `registry/index.json` with complete catalog
   - Proper shadcn/ui CLI-compatible format

4. **Extracts component code**:
   - Reads actual component files
   - Embeds source code in registry
   - Maintains accurate dependencies

### Registry Structure

Generated files follow this structure:

```
registry/
├── index.json              # Complete catalog
├── data-table.json         # Component registry
├── useLocalStorage.json    # Hook registry  
└── ...                     # All components & hooks
```

### Example Usage

After running the generator, users can install components via CLI:

```bash
# Install a component
pnpm dlx shadcn@latest add http://localhost:3000/api/registry/data-table

# Install a hook  
pnpm dlx shadcn@latest add http://localhost:3000/api/registry/useLocalStorage
```

### Manual Updates

The script automatically:
- ✅ Detects new components in categorized folders
- ✅ Updates existing component registrations
- ✅ Handles dependency changes
- ✅ Maintains proper import paths
- ✅ Generates accurate descriptions

### Benefits

1. **Always up-to-date**: Registry reflects actual codebase
2. **No manual maintenance**: Add components, run script
3. **Consistent format**: Proper shadcn/ui compatibility
4. **Accurate imports**: Matches your folder structure
5. **Complete coverage**: Components + hooks included

### Adding New Components

1. Create component in appropriate category folder:
   ```
   components/Form/MyNewInput.tsx
   ```

2. Run the generator:
   ```bash
   pnpm run generate-registry
   ```

3. Registry automatically includes the new component! 🎉

The CLI will handle kebab-case naming, dependency detection, and proper categorization automatically.