declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

// webpack.d.ts
declare module "*.gql" {
  import { DocumentNode } from "graphql";

  const content: DocumentNode;
  export default content;

}

declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const content: DocumentNode;
  export default content;
}
