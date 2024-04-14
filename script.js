const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const strengthIndicator = document.getElementById('strengthIndicator');
const copiedButton = document.getElementById('copiedButton');
const strengthBar = document.getElementById('strength');

passwordInput.addEventListener('input', checkPasswordStrength);
togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
copiedButton.addEventListener('click', copyPassword);

function checkPasswordStrength() {
    const password = passwordInput.value;
    if (password.length === 0) {
        strengthBar.style.width = "0%";
        strengthBar.style.backgroundColor = '#135D66';
        strengthIndicator.textContent = "";
        copiedButton.disabled = true;
        return;
    }

    const strength = calculateStrength(password);
    if (strength < 50) {
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = '#911F0F';
        strengthIndicator.textContent = "Weak";
        copiedButton.disabled = true;
    } else if (strength < 75) {
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = '#D1780E';
        strengthIndicator.textContent = "Medium";
        copiedButton.disabled = true;
    } else {
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = '#22850F';
        strengthIndicator.textContent = "Strong";
        copiedButton.disabled = false;
    }
}

function calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 30;
    if (password.match(/[a-z]/)) strength += 10;
    if (password.match(/[A-Z]/)) strength += 10;
    if (password.match(/[0-9]/)) strength += 10;
    if (password.match(/[$@#&!?]/)) strength += 20;
    return strength;
}

function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
}

function copyPassword() {
    passwordInput.select();
    document.execCommand('copy');

    copiedButton.classList.add('copied');
    copiedButton.textContent = 'Password Copied!';
    
    setTimeout(() => {
        copiedButton.classList.remove('copied');
        copiedButton.textContent = 'Copy Password';
    }, 1000);
}