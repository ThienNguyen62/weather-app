git --version
git init
git status
git remote add origin https://github.com/ThienNguyen62/weather-app
git remote -v
git fetch origin
git switch -C main origin/main
git status
git add .
git commit -m "feat: add project source code"
git push -u origin main
git ls-files // các file theo dõi