# Instalace závislostí

Prerekvizitou je přítomnost prostředí python. V GNU/Linux balíky `python3` nebo `python` a balíky. Ve windows instalace pomocí PE dostupné na url adrese [Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/). Také je vyžadována přítomnost balíkového manažeru pip v linuxu obvykle balíky `python3-pip` nebo `python-pip`.

## UNIX/MacOS

### Instalace

Příklad instalace v distribuci ArchLinux

```sh
sudo pacman -Syu python python-pip
```

### Stažení závislostí

```sh
cd cesta/k/projektu
python -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```

## Windows

### Instalace

Instalace ve Windows je realizována pomocí instalačního průvodce dostupného na url adrese: [Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/)

### Stažení závislostí

```sh
cd cesta/k/projektu
python -m venv .venv
.venv\bin\Activate.bat
python -m pip install -r requirements.txt
```
