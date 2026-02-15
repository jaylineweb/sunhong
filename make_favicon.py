# -*- coding: utf-8 -*-
"""logo.png -> favicon.ico (Pillow 없이 PNG를 ICO 컨테이너에 담기)"""
import os
import struct
import sys

def png_to_ico(png_path, ico_path):
    with open(png_path, "rb") as f:
        png_data = f.read()
    if png_data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError("Not a PNG file")
    # IHDR: width(4), height(4) at offset 16
    width, height = struct.unpack(">II", png_data[16:24])
    w_byte = 0 if width >= 256 else width
    h_byte = 0 if height >= 256 else height
    size = len(png_data)
    offset = 6 + 16  # header + one directory entry
    with open(ico_path, "wb") as f:
        f.write(b"\x00\x00\x01\x00\x01\x00")  # ICONDIR
        f.write(bytes([w_byte, h_byte, 0, 0, 1, 0, 32, 0]))  # ICONDIRENTRY
        f.write(struct.pack("<I", size))
        f.write(struct.pack("<I", offset))
        f.write(png_data)
    print("Created:", ico_path)

# 스크립트 파일 기준 경로 (프로젝트 루트에서 python make_favicon.py 로 실행)
root = os.path.dirname(os.path.abspath(os.path.realpath(__file__)))
src = os.path.join(root, "images", "common", "logo.png")
out = os.path.join(root, "favicon.ico")

if not os.path.isfile(src):
    print("Not found:", src)
    sys.exit(1)

try:
    png_to_ico(src, out)
except Exception as e:
    print(e)
    sys.exit(1)
