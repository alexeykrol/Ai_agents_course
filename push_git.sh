#!/bin/bash
  echo "Автоизменятель 1.0."
git add .

if git diff --cached --quiet; then
  echo "Нет изменений для коммита."
else
  git commit -m "Автоматический коммит"
  git push origin main
  echo "Готово! Изменения отправлены в GitHub."
fi
