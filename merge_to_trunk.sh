#/bin/bash
#set -eu

read -e -p "DESCRIPTION: "      -i "Descripción corta" DESCRIPTION
AUX=`cat release.txt  | awk 'BEGIN{}{print(substr($NF,18,4))}'`
read -e -p "REVISION: "         -i "$AUX?" REVISION
read -e -p "TICKET: "           -i "XXX" TICKET
read -e -p "DEVELOPER: "        -i "login" DEVELOPER
BRANCH="$DEVELOPER-ticket#$TICKET"

RELEASE=`cat release.txt  | awk 'BEGIN{}{print(substr($NF,10,5))}'`
echo "RELEASE: " $RELEASE
DATE=`date +%Y-%m-%d`
MESSAGE_COMMIT="STABLE - Fusion del cambio realizado por $DEVELOPER descrito en #$TICKET"

# 1) Fusión de cambios
git checkout master
git merge $BRANCH

# 2) Actualización de la versión
echo "release=t${RELEASE}rev${REVISION}" > release.txt

# 3) Actualización del registro de cambios
echo "" >> revisions_trunk.rst
BRANCH_VERSION=`git merge-base $BRANCH master`
MERGE_VERSION=`git show --summary | grep 'commit' | awk '{}{print $2}'`
echo "BRANCH_VERSION: " $BRANCH_VERSION
echo "MERGE_VERSION: " $MERGE_VERSION
MESSAGE_LOG="**t${RELEASE}rev${REVISION}** $DATE $DEVELOPER: $DESCRIPTION. #$TICKET, [$BRANCH_VERSION - $MERGE_VERSION]."
echo "$MESSAGE_LOG" >> revisions_trunk.rst
git add release.txt revisions_trunk.rst
git commit -m "Actualizada revisión"

# Se suben al repositorio todos los cambios
git push origin master

# 4) Foto de la versión
git tag -a t${RELEASE}rev${REVISION} -m "TAG - Se congela estado de la t${RELEASE}rev${REVISION}"
git push origin t${RELEASE}rev${REVISION}

# Se elimina la rama
git branch -d ${BRANCH}
git push origin :${BRANCH}

echo ""
echo "RELEASE: "$RELEASE
echo "REVISION: "$REVISION
echo "TICKET: "$TICKET
echo "DEVELOPER: "$DEVELOPER
echo "BRANCH: "$BRANCH
echo "CHANGESET_BRANCH: "$CHANGESET_BRANCH
echo "CHANGESET_TRUNK: "$CHANGESET_TRUNK
echo "DESCRIPTION: "$DESCRIPTION
echo "DATE: "$DATE
echo "MESSAGE_LOG: "$MESSAGE_LOG
echo "MESSAGE_COMMIT: "$MESSAGE_COMMIT
echo ""
echo "Aplicado a trunk en ["$CHANGESET_TRUNK"] y revisión "t${RELEASE}rev${REVISION}"."
echo ""
