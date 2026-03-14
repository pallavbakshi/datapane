---
description: Installing and setting up the Data In Pane library and API on your device
---

Data In Pane's Python library and CLI can be installed using either `pip` or `conda` on macOS, Windows, or Linux. Data In Pane supports Python **3.12+**.

!!! info
    Instructions for installing Python can be found at [https://wiki.python.org/moin/BeginnersGuide/Download](https://wiki.python.org/moin/BeginnersGuide/Download).

    Additional install instructions can be found on the project [GitHub's page](https://github.com/datainpane/datainpane).

## pip

If you use `pip`, you can install it with:

=== "Shell"

    ```bash
    pip3 install -U datainpane
    ```

=== "Jupyter"

    ```bash
    !pip3 install -U datainpane
    ```

## conda

If you use `conda`, you can install it with:

=== "Shell"

    ```bash
    conda install -c conda-forge "datainpane>=0.17.0"
    ```

=== "Jupyter"

    ```bash
    !conda install -c conda-forge "datainpane>=0.16.0"
    ```

!!! warning
    Conda sometimes installs an older version of Data In Pane. If you receive errors, please check the version and try running `conda update --all` or try in a new conda environment (`conda create -n ENV` and `conda activate ENV`)

## Upgrading

To upgrade Data In Pane to the latest version, use the same tool you used to install it:

### Upgrading via pip

```bash
pip install -U datainpane
```

### Upgrading via conda

```bash
conda update datainpane
```

If you receive errors with conda, try using a fresh conda environment (`conda create -n ENV` and `conda activate ENV`).


## Windows Tips and Troubleshooting

We generally recommend installing via `conda` over `pip` on Windows as it's easier to install all the required dependencies.

If you need to install Python first, the latest versions of Windows 10 can install Python for you automatically - running `python` from the command-prompt will take you to the Windows Store where you can download an [official version](https://docs.python.org/3/using/windows.html#the-microsoft-store-package).

We also strongly recommend using a 64-bit rather than the 32-bit version of Python, you can check this by running the following command from the Command Prompt,

```bash
python -c "import struct; print(struct.calcsize('P')*8, 'bit')"
```

Also note that on Windows, you can run the `datainpane` command either by running `datainpane` or `datainpane.exe` on the command-line.

### Windows-specific Issues

#### Import errors when running/importing Data In Pane

You may encounter errors such as `ImportError: DLL load failed` when running Data In Pane or importing it within your Python code.

If so, try installing the [Visual C++ Redistributables for Windows](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads) from Microsoft and running again (you most likely want to download the version for x64, i.e. `vc_redist.x64.exe`)

#### Data In Pane install errors trying to compile `pyarrow` using Visual C++

This usually occurs when you are running a 32-bit version of Python and installing via `pip`. Either try using `conda` or install a 64-bit version of Python (for example from the Windows Store as mentioned above).

This may also occur when using Windows 7 - we only support directly Windows 10, however, it may be worth trying to install via `conda` instead, if you are stuck on Windows 7.
