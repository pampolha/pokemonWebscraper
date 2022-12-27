# Observações
Esse código é apenas uma demonstração, e não é garantido de funcionar como o esperado sem configuração prévia. Ele contém nomes arbitrários nos scripts e requer ações prévias na AWS, como a criação da função lambda e de um bucket s3. 

# Instruções
* 1. Baixe ou clone o repositório, navegue até a localização dele e abra um terminal.
* 2. Execute no terminal o script sendToLambda com npm utilizando `npm run sendToLambda`
* 3. Aguarde a execução do script e verificar o seu bucket/lambda para confirmar que o arquivo foi enviado corretamente.
* 4. Não esqueça de definir o runtime da sua função para node 14
* 5. Recomendo definir a memória RAM da função para 1000 MB e o timeout para 1 minuto e 30 segundos
* 6. Crie um teste com um objeto de entrada que contenha a propriedade `pokemonName` que contém o nome do Pokémon
* 7. Salve e execute o teste.
