
# Instruções pra a API:

1.  Na pasta `src/environments/`, renomear o arquivo `renomear.ts` para `env-pra-uso.ts`
2.  Abrir ele e trocar `Chave-TMDB-aqui` pela chave de API pessoal
3.  Salvar o arquivo e rodar

# Vídeo da plataforma em uso: 
https://youtu.be/NjBw1W1nAlE?si=LzSUGDqcj0KeBKCf

# Decisões de Arquitetura - CineLog

### Componentes Abstratos e Reutilizáveis

* Aproveitei a componetização do Angular e criei **componentes de base reutilizáveis** para elementos de UI que se repetem, como Button e Dialog em shared/components, pra padronização e reutilização mais fácil
* Uma única alteração no BaseDialogComponent, por exemplo, se reflete em todos os diálogos do site, simplificando a manutenção

### Responsabilidade Única

* Cada componente e serviço foi projetado com responsabilidade única, tornando o código mais previsível e fácil de depurar
* Um bom exemplo é o `MarathonListComponent`, que é responsável apenas por exibir os dados e emitir eventos
* A lógica de negócio real, como remover um filme, é delegada ao MarathonFacadeService, mantendo cada peça do sistema com um propósito claro

### Arquitetura Facade

* Utilizei o padrão **Facade** para criar uma separação clara entre a lógica de negócio e os componentes visuais
* A lógica fica centralizada em serviços como o `GeneratorFacadeService` (`src/app/features/movies/services/movie.facade.ts`)
* Os componentes se tornam mais simples, focados apenas na interface
* Código se torna bem mais facil e organizado pra testar

