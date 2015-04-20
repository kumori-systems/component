#/bin/bash
#set -eu

read -e -p "DESCRIPTION: "      -i "Descripción corta" DESCRIPTION
AUX=`cat release.txt  | awk 'BEGIN{}{print(substr($NF,18,4))}'`
read -e -p "REVISION: "         -i "$AUX?" REVISION
read -e -p "TICKET: "           -i "XXX" TICKET
read -e -p "DEVELOPER: "        -i "login" DEVELOPER
BRANCH="$DEVELOPER-ticket#$TICKET"

MONTH=`date +%m`
YEAR=`date +%g`
RELEASE="${YEAR}.${MONTH}"
# RELEASE=`cat release.txt  | awk 'BEGIN{}{print(substr($NF,10,5))}'`
echo "RELEASE: " $RELEASE
DATE=`date +%Y-%m-%d`
MESSAGE_COMMIT="STABLE - Fusion del cambio realizado por $DEVELOPER descrito en #$TICKET"

# 1) Fusión de cambios
git checkout develop
git merge $BRANCH

# 2) Actualización de la versión
echo "release=t${RELEASE}rev${REVISION}" > release.txt

# 3) Actualización del registro de cambios
echo "" >> revisions.rst
BRANCH_VERSION=`git merge-base $BRANCH develop`
MERGE_VERSION=`git show --summary | grep 'commit' | awk '{}{print $2}'`
echo "BRANCH_VERSION: " $BRANCH_VERSION
echo "MERGE_VERSION: " $MERGE_VERSION
MESSAGE_LOG="**t${RELEASE}rev${REVISION}** $DATE $DEVELOPER: $DESCRIPTION. #$TICKET, [$BRANCH_VERSION - $MERGE_VERSION]."
echo "$MESSAGE_LOG" >> revisions.rst
git add release.txt revisions.rst
git commit -m "Actualizada revisión"

# Se suben al repositorio todos los cambios
git push origin develop

# 4) Foto de la versión
git tag -a t${RELEASE}rev${REVISION} -m "TAG - Se congela estado de la t${RELEASE}rev${REVISION}"
git push origin t${RELEASE}rev${REVISION}

# Se elimina la rama
read -e -p "Se va a eliminar la rama ${BRANCH} (Y para continuar)" DELETE_CONFIRMATION
if [[ $DELETE_CONFIRMATION == "Y" ]] ; then
	git branch -d ${BRANCH}
	git push origin :${BRANCH}
else
	echo "Se omite el borrado de la rama ${BRANCH}"
fi

echo ""
echo "RELEASE: "$RELEASE
echo "REVISION: "$REVISION
echo "TICKET: "$TICKET
echo "DEVELOPER: "$DEVELOPER
echo "BRANCH: "$BRANCH
echo "CHANGESET_BRANCH: "$CHANGESET_BRANCH
echo "CHANGESET_DEVELOP: "$CHANGESET_DEVELOP
echo "DESCRIPTION: "$DESCRIPTION
echo "DATE: "$DATE
echo "MESSAGE_LOG: "$MESSAGE_LOG
echo "MESSAGE_COMMIT: "$MESSAGE_COMMIT
echo ""
echo "Aplicado a develop en ["$CHANGESET_DEVELOP"] y revisión "t${RELEASE}rev${REVISION}"."
echo ""
