/* eslint brace-style: [2, "1tbs", { "allowSingleLine": true }] */
/* eslint-disable class-methods-use-this */
class UserDataCheck {
  checkMandatoryData(user) {
    let userInfo = {
        address: user[0].adresseFormatee,
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].codeCommune,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        usual_name: user[0].nomDeNaissance,
        gender: user[0].Gender,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: user[0].prenom,
        phone: user[0].telephone,
        preferred_username: user[0].identifiant,
        updated_at: user[0].updatedAt,
        siren: user[0].siren,
        siret: user[0].siret,
        organizational_unit: user[0].serviceAffectation,
        belonging_population: user[0].populationAppartenance,
        position: user[0].position,
        job: user[0].job,
        uid: user[0].uid
    }

    return userInfo;
  }
}
module.exports = UserDataCheck;
