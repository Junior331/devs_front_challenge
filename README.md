# DEVS FRONT CHALLENGE

## App

- https://devs-front-challenge.vercel.app/auth/login

#### O Produto

![Login](https://github.com/user-attachments/assets/c4875c04-ab21-42ec-a62e-e5846e12a39c)
![Recuperar senhas](https://github.com/user-attachments/assets/7348ae7b-7a4f-419c-978e-43764be12e3e)
![Email enviado](https://github.com/user-attachments/assets/3c7a1510-4a95-4060-952b-c0cb873d0017)
![Alterar senha](https://github.com/user-attachments/assets/cdfe257f-aea4-4ff8-8e0f-5cdaa0336c5f)

## Principais Tecnologias utilizadas


- **Supabase**: Para gerenciamento de infraestrutura.
- **Next**: Framework para desenvolvimento front-end.
- **Tailwind CSS**: Para estilização eficiente.
- **TypeScript**: Para um desenvolvimento mais seguro e tipado.
- **Framer Motion**: Para animações suaves e transições elegantes.

## Instalação

- Clone o repositório com
  ```
  git clone https://github.com/Junior331/devs_front_challenge.git
  ```
- É necessario ter o Node 22x ou superior instalado
- Para iniciar o servidor de desenvolvimento rode os comandos abaixo

```
yarn
yarn dev
```

### Funcionalidades Principais
- [x] Estrutura inicial do projeto
- [x] Implementação de Theme e Style
- [x] Desenvolvimento de componentes base
- [x] Sidebar responsiva com animações
- [x] Criar fluxo de autenticação:
  - [x] Tela de Login
  - [x] Tela de Reset Password
  - [x] Tela de New Password

### Páginas
- [x] **Login**: Página de login.
- [x] **Welcome**: Página inicial do app.
- [x] **Reset Password**: Página para redefinição de senha.

### Componentes
#### Atoms
- [x] Input
- [x] Button

#### Organisms
- [x] LoginForm
- [x] NewPasswordForm
- [x] ResetPasswordForm

#### Molecules
- [x] FormField
- [x] AlertMessage
- [x] PasswordInput

#### Templates


### Recursos Avançados
- [x] **Sidebar Responsiva**: Implementação de uma sidebar que se adapta a diferentes tamanhos de tela.
- [x] **Animações com Framer Motion**: Transições suaves para melhorar a experiência do usuário.
- [x] **Gerenciamento de Estado com Context API**: Utilização de contextos para gerenciar o estado da sidebar.

### Descrição da estrutura do projeto

- `Atoms`: Os átomos são componentes básicos e individuais, como botões, inputs, selects, etc. Um menu lateral geralmente é composto por diversos elementos, como ícones, textos, talvez até mesmo botões para navegação, e cada um desses elementos pode ser considerado um átomo. No entanto, o menu lateral como um todo é mais complexo do que apenas um único átomo.

- `Molecules`: As moléculas são compostas por átomos e têm uma funcionalidade mais complexa. Um menu lateral poderia ser considerado uma molécula se fosse composto por vários átomos (como botões, ícones, etc.) agrupados de uma maneira específica para uma função específica. No entanto, um menu lateral geralmente representa uma parte maior e mais significativa da interface do usuário.

- `Organism`: Os organismos são componentes mais complexos que combinam vários átomos e/ou moléculas para formar uma parte significativa de uma interface. Um menu lateral se encaixa nessa definição, pois geralmente consiste em uma combinação de vários elementos (como itens de menu, ícones, títulos, etc.) agrupados para formar uma parte distinta e funcional da interface do usuário.

- `Hooks`: Os hooks são funções especiais que permitem que você use o estado e outros recursos do React dentro de componentes de função. Eles foram introduzidos no React 16.8 para permitir o uso de estado e outras funcionalidades anteriormente disponíveis apenas em componentes de classe em componentes de função.

- `Utils`: desempenha um papel crucial na organização e eficiência do código da aplicação. Ela abriga uma variedade de utilitários que são essenciais para diferentes partes da aplicação, ex: funções e arquivos auxiliares, como emptys, endpoints, types e funções auxiliares.

### Estrutura do projeto

    ├── src/
    │   ├── app/
    │   │   ├── auth/
    │   │   │   ├── login/
    │   │   │   ├── reset-password/
    │   │   │   └── welcome/
    │   ├── components/
    │   │   ├── atoms/
    │   │   │   ├── Input
    │   │   │   ├── Button
    │   │   │   └── index.ts
    │   │   ├── molecules/
    │   │   │   ├── FormField
    │   │   │   ├── AlertMessage
    │   │   │   ├── PasswordInput
    │   │   │   └── index.ts
    │   │   ├── organism/
    │   │   │   ├── LoginForm
    │   │   │   ├── NewPasswordForm
    │   │   │   ├── ResetPasswordForm
    │   │   │   └── index.ts
    │   │   ├── templates/
    │   ├── services/
    │   │   └── services.ts
    │   ├── utils/
    │   │   ├── supabase/
    │   │   │   ├── client.ts
    │   │   │   ├── server.ts
    │   │   │   └── middleware.ts

- O diretório `src/` contém todos os componentes do projeto, organizados de acordo com o padrão atomic.
  Cada componente é classificado como `atoms`, `molecules` ou `organisms`, conforme
  sua complexidade e reutilização.
