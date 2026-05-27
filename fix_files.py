import os

BASE = 'C:/Users/kj583/gate-prep-app'

def w(r, c):
    p = os.path.join(BASE, r)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'OK: {r} ({len(c)} chars)')

def a(r, c):
    p = os.path.join(BASE, r)
    with open(p, 'a', encoding='utf-8') as f:
        f.write(c)
    print(f'APPEND: {r} ({len(c)} chars)')

print('Builder functions ready')
