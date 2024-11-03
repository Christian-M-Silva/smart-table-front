# Smart-table-front

## Table of contents

- [Overview](#overview)
  - [The objectives](#the-objectives)
  - [How to run the project](#how-to-run-the-project)
  - [Solution link](#solution-link)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The objectives

- Uma tabela que permite o usuario cadastrar dados que serão atualizados automaticamente. Muito util para fazer escalas

### How to run the project
  1. Após o download do codigo na sua maquina, rode no terminal do projeto:
  ```bash
    npm i 
    # or:
    yarn
  ```

  2. Altere o ```.env.example``` para ```.env```

  3. Após o sucesso do download dos pacotes, rode no terminal do projeto:
  ```bash
    npm run dev 
    # or:
    yarn dev
  ```

  **Por padrão a url será [http://localhost:8080/loginAndRegister](http://localhost:8080/loginAndRegister)**

  4. Será necessário no ```.env``` incluir algumas chaves secretas:
  ```
    VUE_APP_CLIENT_ID= Chave obtida no google console, terá que criar um projeto para isso
    VUE_APP_CLIENT_SECRET= Chave obtida no google console, terá que criar um projeto para isso
    VUE_APP_SECRET_KEY= Chave aleatorio escolhida pelo user
  ```
   **Para gerar as chaves é só seguir as instruções do google nesse [link](https://developers.google.com/calendar/api/quickstart/nodejs?hl=pt-brink)**

   5. Por fim será necessario a API desse projeto que está nesse [repositorio](https://github.com/Christian-M-Silva/smart-table-api)

### Solution link

[Clique aqui para ir até o projeto](https://github.com/Christian-M-Silva/smart-table-front)

## My process

### What I learned

Aprendi a usar o sistema de login do google e a integração com a API de calendario deles, a criar um arquivo .doc

## Author

- Name - Christian
- Linkedin - [@Christian Silva]( https://www.linkedin.com/in/christian-silva-83172621a)
- GitHub - [@Christian Silva](https://github.com/Christian-M-Silva)