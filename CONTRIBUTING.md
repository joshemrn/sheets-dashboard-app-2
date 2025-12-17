# Contributing to Secure Sheets Dashboard

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/YOUR-USERNAME/sheets-dashboard-app/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser/OS information

### Suggesting Features

1. Check if the feature has been suggested in [Issues](https://github.com/YOUR-USERNAME/sheets-dashboard-app/issues)
2. Create a new issue with:
   - Clear use case
   - Expected behavior
   - Why this feature would be useful
   - Possible implementation ideas

### Code Contributions

#### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/sheets-dashboard-app.git
   cd sheets-dashboard-app
   ```

3. Install dependencies:
   ```bash
   npm install
   cd functions
   npm install
   cd ..
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Make your changes

6. Test your changes:
   ```bash
   npm run dev
   ```

#### Code Style Guidelines

**React/JavaScript:**
- Use functional components and hooks
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

**CSS:**
- Use existing CSS variables
- Follow mobile-first approach
- Maintain responsive design
- Use semantic class names

**Functions:**
- Add error handling
- Log important operations
- Validate input
- Use async/await

#### Commit Messages

Follow conventional commits:
```
feat: Add data export functionality
fix: Resolve authentication timeout issue
docs: Update deployment instructions
style: Format Dashboard component
refactor: Simplify data fetching logic
test: Add tests for auth context
```

#### Pull Request Process

1. Update documentation if needed
2. Test thoroughly:
   - [ ] All features work
   - [ ] No console errors
   - [ ] Responsive design intact
   - [ ] Authentication flows work

3. Create pull request with:
   - Clear description of changes
   - Link to related issue
   - Screenshots (if UI changes)
   - Testing steps

4. Wait for review
5. Address feedback
6. Celebrate when merged! 🎉

## 🎯 Areas for Contribution

### High Priority
- [ ] Data caching implementation
- [ ] Search/filter functionality
- [ ] Data export (CSV/PDF)
- [ ] User profile management
- [ ] Email verification flow

### Medium Priority
- [ ] Data visualization (charts)
- [ ] Multiple sheet support
- [ ] Custom column configuration
- [ ] Dark mode
- [ ] Keyboard shortcuts

### Good First Issues
- [ ] Improve loading animations
- [ ] Add more form validation
- [ ] Improve error messages
- [ ] Add accessibility features
- [ ] Documentation improvements

## 🧪 Testing

Before submitting:

### Frontend Testing
```bash
# Start dev server
npm run dev

# Test these scenarios:
# 1. Sign up new user
# 2. Log in
# 3. Reset password
# 4. Load data
# 5. Refresh data
# 6. Log out
# 7. Try accessing dashboard while logged out
```

### Function Testing
```bash
# Deploy to test environment
firebase deploy --only functions

# Check logs
firebase functions:log
```

## 📝 Documentation

When adding features:
- Update README.md if needed
- Add to QUICK_REFERENCE.md for common tasks
- Update ARCHITECTURE.md for structural changes
- Comment complex code

## 🔒 Security

- Never commit secrets or API keys
- Report security issues privately (email maintainer)
- Test authentication thoroughly
- Validate all user input
- Follow existing security patterns

## 💬 Questions?

- Open a [Discussion](https://github.com/YOUR-USERNAME/sheets-dashboard-app/discussions)
- Comment on related issues
- Reach out to maintainers

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## 🙏 Thank You!

Every contribution helps make this project better. Whether it's code, documentation, bug reports, or feature suggestions - thank you for being part of the community!

---

**Happy Coding! 🚀**
