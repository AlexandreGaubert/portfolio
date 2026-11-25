# Mes agents IA codent en parallèle. Le goulot, c'est moi.

Un lundi, vers 13 heures. Mon Mac se met en veille d'urgence thermique. Puis une deuxième fois. Cinq fois dans l'heure.

Sept chantiers tournaient en même temps sur le même projet, chacun avec ses builds et ses tests. Sept agents IA qui planifiaient, codaient et testaient de leur côté. À chaque veille, tout s'arrêtait d'un coup, et le parallélisme ne rapportait plus rien.

Ce jour-là, la machine a lâché la première. Elle n'était pourtant pas le vrai goulot.

## Tout le monde a sa boucle d'agents

Un agent qui planifie, code, lance les tests et recommence jusqu'au vert : en 2026, ça n'impressionne plus personne. On en conclut volontiers que le développeur devient superflu.

Mes chiffres disent autre chose. J'ai mesuré 59 de mes sessions de code début novembre : le modèle ne génère que 32 % du temps. Plus de 40 % du temps, il attend les tests, git et le typecheck.

Le temps se perd autour du code, et d'abord dans les décisions. Chaque changement finit par une question qu'un humain doit trancher : ce périmètre, cette option, cette mise en production. Avec dix agents, ces questions arrivent dix fois plus vite.

En projet personnel, j'ai donc construit un système d'ingénierie dont le centre n'est pas l'agent, mais la décision.

## Une seule file de décisions

Au début, mes agents me posaient leurs questions dans leur propre conversation. Je ne les voyais pas. L'agent attendait une réponse, et personne ne savait qu'il attendait.

Aujourd'hui, je dépose une demande dans un projet. Un agent manager tient ce projet : il le découpe en chantiers, lance un agent par chantier, et chaque chantier travaille seul puis lui rend compte. Moi, je n'ai qu'une interface.

Tout ce qui demande un choix y remonte, en carte : une feature, un refactor, une correction de bug, une mise en production. Je ne laisse pas l'IA piloter mes projets. Chaque décision passe par ma file, et je relis chaque changement avant qu'il parte en review. C'est justement pour ça que tout le reste du système doit me faire gagner du temps.

Le gain se joue sur la forme. Chaque carte tient seule : le contexte depuis zéro, le problème vu par l'utilisateur, deux ou trois options avec leur conséquence, une recommandation, ce qui a été prouvé et ce que coûterait une erreur. Pour un écran, la capture d'avant et celle d'après. Je tranche sans rouvrir le projet, et j'enchaîne les cartes d'affilée. C'est ce qui me permet de lancer autant de chantiers en parallèle : ce qu'ils attendent de moi tient sur une carte.

## Fixer le périmètre avant le code

« Ajoute un filtre à la liste des tickets » cache des cas : la liste vide, l'erreur réseau, le filtre qui doit survivre au rechargement, la pagination qui doit revenir à la première page quand le filtre change. Un agent qui code tout de suite en oublie une partie, et rien ne le lui signale.

Avant la première ligne, un agent qui ignore l'implémentation prévue dresse la liste de tout ce que le changement doit gérer. Il ne voit jamais le plan : il ne peut pas le valider par complaisance.

Cette liste ne s'arrête pas à l'écran qu'on modifie. Elle regarde comment le changement s'inscrit dans ce qui existe autour. Le serveur et l'application mobile ne se déploient pas en même temps : la version déjà installée chez les utilisateurs lira-t-elle encore la réponse de l'API ? La documentation ou le texte d'un écran deviendront-ils faux ? Un comportement sur lequel quelqu'un comptait, un export, une notification, va-t-il s'arrêter sans que personne l'ait décidé ?

## Une review qui suit le risque

Un second agent cherche à réfuter chaque changement non trivial. Il n'a pas écrit le code et ne cherche pas à le défendre. Il relit avec des consignes écrites et rend ses remarques classées par gravité. La règle de la maison : cette review passe avant le premier push de chaque branche.

Un autre agent reprend la liste écrite avant le code et la confronte au diff, cas par cas. Quand la description de la pull request affirme qu'un cas est traité, il y voit une piste, et va le vérifier dans le code. Un cas laissé de côté ne passe pas en silence : il remonte sur ma carte de décision. Et quand le changement ajoute une surface que personne n'a demandée, un champ d'API ou une option de configuration, il la signale comme une décision prise par défaut, à trancher avant qu'elle devienne un contrat.

Une review uniforme traite un renommage comme une modification du module de paiement. La prochaine marche, que je n'ai pas encore franchie : que la criticité du changement fixe les règles d'approbation. Une correction de libellé se contenterait d'une approbation. Une pull request qui touche le paiement en exigerait davantage, dont celle de quelqu'un de l'équipe qui connaît ce module.

## Ce qui reste déterministe

L'IA ne remplace aucun contrôle classique. Les tests et les linters tournent comme avant, et un test ne compte qu'une fois vu échouer sur du code cassé. Un test de l'écran d'erreur dont la seule assertion est que le composant s'est rendu reste vert quoi qu'il arrive. Alors l'agent casse le code, regarde le test rougir, puis répare.

Chaque agent travaille dans son propre worktree git. Des hooks Claude Code, des scripts qui s'exécutent avant chaque commande de l'agent, refusent ce qu'une consigne écrite ne suffit pas à empêcher : une commande git destructrice, un drapeau qui désarme les contrôles avant commit, une suite de tests complète lancée en local, une fenêtre de navigateur qui s'ouvrirait sur mon écran. La protection tient même quand l'agent se trompe sur ce qu'il fait.

Une fois la pull request ouverte, un agent la surveille : il corrige la CI rouge et traite les commentaires de review. Dès qu'il a un doute, il ne tranche pas. Il me pose la question, dans la file.

## Tester d'abord ce qui va casser

Les tests de tous les agents passent par une file d'attente : deux runs à la fois, et les autres attendent leur tour au lieu de se disputer la machine. Ce lundi-là, une bonne part de ce qui faisait chauffer le Mac passait à côté de cette file : les simulateurs, des scripts qui lançaient leurs tests sans le dire. Depuis, eux aussi attendent leur tour.

La file ne suffit pas : un agent ne lance pas toute la suite avant de pousser. Il sélectionne les tests qui ont le plus de chances de casser avec son changement : ceux qui ont échoué la dernière fois sur sa branche, ceux que le diff touche, puis ceux qui importent ce qui a changé. Il s'arrête au premier échec. Le retour arrive vite, et il porte sur ce qui a le plus de chances d'être cassé.

La suite complète reste le travail de la CI de la pull request. Elle ne tourne plus pour rien, avec ce qu'elle coûte, sur une casse qu'un test ciblé aurait trouvée avant le push.

## Un système qui s'améliore lui-même

Le fond du projet est là : le système ne reste pas tel que je l'ai écrit. Il s'améliore en continu, et ce sont les agents qui le demandent.

Quand un agent bute sur une limite du système, un outil qui lui manque, une règle qui lui a fait perdre du travail, un accès qui casse, il le signale : il demande une amélioration à un agent manager chargé de l'amélioration du système. Ce manager reçoit les demandes de tous les chantiers, les trie, et me propose celles qui valent d'être faites. Je décide lesquelles se font.

Ce que les agents apprennent ne se perd pas non plus. Un problème qu'un autre agent rencontrerait aussi va dans un journal partagé : ce qui s'est passé, ce que ça a coûté, comment l'agent l'a contourné. Un agent qui démarre relit ce que le journal dit de son sujet.

Rien de tout ça ne doit dépendre d'un fournisseur. Pour l'instant, le système tourne sur Claude Code. Je le conçois pour que les mêmes chantiers puissent tourner demain sur Codex, sur Cursor ou avec un modèle passé par OpenRouter : la file de décisions, le journal des incidents et les consignes de review restent à moi, quel que soit l'outil.

## Protéger mon attention

Tout le reste sert la même ressource : mon attention.

Rien ne m'oblige à surveiller. Un agent d'astreinte tourne en continu sur les pannes du système lui-même : un accès perdu, un message qui n'arrive pas. Un îlot en haut de l'écran de mon Mac me signale une décision qui attend, même quand je suis dans une autre application. Une demande reçue par Slack ou par mail me revient tant qu'elle n'est pas faite.

Ce que je relis arrive préparé. Une vue pull request me résume le changement à côté du diff et de ses commentaires. Les agents testent leur écran dans leur propre navigateur avant de me le montrer, et ne me demandent que ce que je suis seul à pouvoir faire, comme me connecter à un site. Quand une erreur apparaît en production, l'agent qui me prévient a déjà lancé l'analyse de cause.

Et je sais ce que le système me coûte : des statistiques suivent les pull requests mergées, les tokens dépensés par pull request, les délais et le nombre de chantiers en parallèle.

## Réparer l'humain

Ce lundi-là, la machine a cédé la première, et la réponse a été une file d'attente plus large. Mon attention, c'est un format qui la protège : des décisions qui arrivent prêtes à trancher.

Faire écrire du code par des agents est devenu banal. Le travail d'ingénieur s'est déplacé vers ce qui reste rare : la décision humaine, qu'il faut rendre rapide sans la rendre aveugle.

Sur le code d'un client, les agents ne travaillent qu'avec l'accord de l'équipe et avec les outils qu'elle autorise. Sans eux, la méthode ne change pas : le périmètre s'écrit avant le code, et un test ne compte qu'une fois vu échouer.

Je suis product engineer React et TypeScript : je livre des fonctionnalités de bout en bout. Disponible en freelance à partir de début janvier 2027, en full remote ou en hybride à Rennes.
