#!/bin/bash

echo "=== GitHub SSH Key Debugging ==="
echo ""

echo "1. Aktiver GitHub Account:"
gh auth status 2>&1 | grep "Active account" | head -1
echo ""

echo "2. SSH-Keys im SSH-Agent:"
ssh-add -l 2>&1
echo ""

echo "3. Verfügbare SSH-Keys:"
ls -la ~/.ssh/*.pub 2>/dev/null | awk '{print $9, "(" $(NF) ")"}'
echo ""

echo "4. SSH-Authentifizierungstest (github.com):"
ssh -T git@github.com 2>&1 | head -1
echo ""

echo "5. SSH-Authentifizierungstest (github.com-tw):"
ssh -T git@github.com-tw 2>&1 | head -1
echo ""

echo "6. Registrierte SSH-Keys beim aktiven GitHub-Account:"
gh ssh-key list 2>&1 | head -10
echo ""

echo "7. SSH-Konfiguration für GitHub:"
grep -A 5 "Host github.com" ~/.ssh/config 2>/dev/null || echo "Keine SSH-Konfiguration gefunden"
echo ""

echo "8. Welcher Key wird für git@github.com verwendet?"
echo "   Teste mit: ssh -vT git@github.com 2>&1 | grep 'Offering public key'"
echo ""

echo "=== Tipps ==="
echo "- Um den Firmen-Key zu verwenden, stelle sicher, dass er im SSH-Agent ist:"
echo "  ssh-add ~/.ssh/id_ed25519_tw"
echo ""
echo "- Um zu prüfen, ob der Key SSO-autorisiert ist:"
echo "  1. Gehe zu: https://github.com/settings/keys"
echo "  2. Klicke auf 'Configure SSO' neben dem Key"
echo "  3. Autorisiere den Key für die Organisation"
echo ""







