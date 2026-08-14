import matplotlib.pyplot as plt
import os

def print_heading(title):
    print("\n" + "=" * 60)
    print(title)
    print("=" * 60)


def save_plot(path):
    plt.tight_layout()
    plt.savefig(path, dpi=300, bbox_inches="tight")
    plt.close()