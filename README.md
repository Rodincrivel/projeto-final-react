Projeto Final React - Charlie Loja de Doces

Descrição

Este é o projeto final para a loja Charlie Loja de Doces, desenvolvido utilizando React. O sistema possui uma área administrativa que permite aos administradores gerenciar produtos, categorias e outros administradores. Também é possível realizar o login seguro para acessar funcionalidades específicas.

O objetivo principal deste projeto é criar uma plataforma de gerenciamento eficiente para produtos e categorias, integrando um design responsivo e reutilizando componentes previamente criados na área do usuário. A aplicação é baseada em React, utilizando CSS personalizado e integrando fontes personalizadas para melhorar a experiência do usuário.

Estrutura do Projeto

Diretórios Principais

src/components: Contém os componentes reutilizáveis como o Header.

src/pages: Páginas principais da aplicação como AdminHomePage, AdminListPage, ProductListPage, entre outras.

src/styles: Estilos CSS utilizados em diferentes partes da aplicação, garantindo um layout consistente.

public: Arquivos públicos, como o logo.svg utilizado no cabeçalho.

Principais Páginas Implementadas

AdminHomePage: Página inicial da área do administrador, contendo um menu para navegação entre as opções de gerenciamento.

AdminListPage: Página para listar e gerenciar os administradores.

CategoryListPage e CategoryCreateEditPage: Páginas para listar, criar e editar as categorias de produtos.

ProductListPage, ProductCreatePage, e ProductEditPage: Páginas para listar, criar e editar produtos.

LoginPage: Página de login para administradores acessarem a área restrita.

Funcionalidades

Autenticação de Administradores: O administrador faz login para acessar funcionalidades como gerenciamento de produtos e categorias.

Gerenciamento de Produtos, Categorias e Administradores: Criação, edição e exclusão de registros através de um backend que responde às requisições do frontend React.

Header Reutilizável: O componente Header é utilizado para manter um layout padronizado em toda a aplicação, com navegação e logo em SVG.

Tecnologias Utilizadas

React: Biblioteca JavaScript para criação da interface de usuário.

React Router: Para gerenciamento de rotas e navegação entre as páginas.

Axios: Para fazer requisições HTTP e consumir a API do backend.

CSS Modules: Utilização de arquivos CSS personalizados para estilização dos componentes e páginas.

Bebas Neue e Poppins: Fontes utilizadas para dar uma identidade visual única ao site.

Como Rodar o Projeto

Clone o repositório na sua máquina local:

git clone https://github.com/Rodincrivel/projeto-final-react.git

Instale as dependências necessárias:

npm install

Rode o servidor de desenvolvimento:

npm start

Abra o navegador e acesse: http://localhost:3000.

Estrutura do Header

O Header foi estilizado e reaproveitado da área do usuário. Contém uma seção superior com uma linha decorativa, logo central e uma seção de navegação inferior com as opções "Home", "Produtos", "Categorias" e "Administradores".

Melhorias Futuras

Autenticação e Autorizacao: Implementar um sistema de autenticação mais seguro e proteção de rotas.

Validação de Formulários: Adicionar mais validações e feedback ao usuário nos formulários de criação e edição.

Melhoria na Experiência do Usuário: Fazer ajustes na interface para torná-la mais amigável e responsiva em diferentes tamanhos de tela.

Considerações Finais

Este projeto foca em criar uma área administrativa completa e eficiente para a gestão da loja Charlie Loja de Doces, utilizando boas práticas de desenvolvimento com React. Estamos abertos a sugestões e contribuições para tornar o sistema ainda melhor.

