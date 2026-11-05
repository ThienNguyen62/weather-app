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
# Liệt kê các tệp đang được Git theo dõi
git ls-files


# Nếu cần đổi tên nhánh từ master sang main
git branch -M main
git remote -v
git push -u origin main
