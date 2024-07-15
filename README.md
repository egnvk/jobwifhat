#### Запуск nextjs

> :warning: **при разработке использовалась nodejs версии [20.15.0 LTS](https://nodejs.org/en/blog/release/v20.15.0)**

1. устанавливаем зависимости

```bash
npm i
```

2. собираем проект

```bash
npm run build
```

3. запускаем

```bash
npm run start
```

4. go http://localhost:3000

---

#### Пополняем wallet

> :warning: **рекомендуется использовать линукс! only linux**

1. Скачиваем и устанавливаем solana

```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

для windows можно попробовать сделать это

```
cmd /c "curl https://release.solana.com/stable/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs"

```

2. Опционально. Если вы используете командную оболочку, например `fish, zsh` то возможно вам придется добавить в конфиг оболочки, путь до solana.

3. Проверяем, что солана установлена. Если в ответ видим версию соланы. идем дальше. Иначе use linux

```bash
solana --version
```

4. Устанавливаем url адрес devnet сети в конфиге

```bash
solana config set --url https://api.devnet.solana.com
```

5. Запрашиваем тестовые sol для публичного адреса который получили на главной странице.
   после того как придёт соль. Можно сделать трансфер на другой адрес.

```bash
solana airdrop 2 <YOUR_PUBLIC_ADDRESS_HERE>
```

---

#### Поднимаем ноду

1. Запускаем ноду в тестовой сети

```bash
solana-test-validator
```

2. Запускаем логи

```bash
solana logs --url localhost
```
