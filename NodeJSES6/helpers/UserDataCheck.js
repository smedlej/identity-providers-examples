/* eslint brace-style: [2, "1tbs", { "allowSingleLine": true }] */
/* eslint-disable class-methods-use-this */
class UserDataCheck {
  checkMandatoryData(user) {
    let userInfo;
    if (
      user[0].nomDeNaissance === ''
      || user[0].nomDeNaissance === undefined
      || user[0].nomDeNaissance === null
      || typeof user[0].nomDeNaissance !== 'string'
    ) {
      userInfo = {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].codeCommune,
        email: user[0].email,
        gender: user[0].Gender,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        nickname: user[0].prenom,
        phone: user[0].telephone,
        preferred_username: user[0].prenom,
        updated_at: user[0].updatedAt,
        siren: user[0].siren,
        siret: user[0].siret,
        organizational_unit: user[0].serviceAffectation,
        belonging_population: user[0].populationAppartenance,
        position: user[0].position,
        job: user[0].job,
      };
    } else if (
      user[0].prenom === ''
      || user[0].prenom === undefined
      || user[0].prenom === null
      || typeof user[0].prenom !== 'string'
    ) {
      userInfo = {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].codeCommune,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        usual_name: user[0].nomDeNaissance,
        gender: user[0].Gender,
        middle_name: user[0].secondPrenom,
        phone: user[0].telephone,
        updated_at: user[0].updatedAt,
        siren: user[0].siren,
        siret: user[0].siret,
        organizational_unit: user[0].serviceAffectation,
        belonging_population: user[0].populationAppartenance,
        position: user[0].position,
        job: user[0].job,
      };
    } else if (
      user[0].birthdate === ''
      || user[0].birthdate === undefined
      || user[0].birthdate === null
      || typeof user[0].birthdate !== 'string'
    ) {
      userInfo = {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
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
        preferred_username: `${user[0].prenom}_${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siren: user[0].siren,
        siret: user[0].siret,
        organizational_unit: user[0].serviceAffectation,
        belonging_population: user[0].populationAppartenance,
        position: user[0].position,
        job: user[0].job,
      };
    } else if (
      user[0].codeCommune === ''
      || user[0].codeCommune === undefined
      || user[0].codeCommune === null
      || typeof user[0].codeCommune !== 'string'
    ) {
      userInfo = {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        usual_name: user[0].nomDeNaissance,
        gender: user[0].Gender,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: user[0].prenom,
        phone: user[0].telephone,
        preferred_username: `${user[0].prenom}_${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siren: user[0].siren,
        siret: user[0].siret,
        organizational_unit: user[0].serviceAffectation,
        belonging_population: user[0].populationAppartenance,
        position: user[0].position,
        job: user[0].job,
      };
    } else if (
      user[0].Gender === ''
      || user[0].Gender === undefined
      || user[0].Gender === null
      || typeof user[0].Gender !== 'string'
    ) {
      userInfo = {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].codeCommune,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        usual_name: user[0].nomDeNaissance,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: user[0].prenom,
        phone: user[0].telephone,
        preferred_username: `${user[0].prenom}_${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siren: user[0].siren,
        siret: user[0].siret,
        organizational_unit: user[0].serviceAffectation,
        belonging_population: user[0].populationAppartenance,
        position: user[0].position,
        job: user[0].job,
      };
    } else {
      userInfo = {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          locality: '000',
          postal_code: '000',
          region: '000',
          street_address: user[0].adresseFormatee,
        },
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
        preferred_username: `${user[0].prenom}_${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siren: user[0].siren,
        siret: user[0].siret,
        organizational_unit: user[0].serviceAffectation,
        belonging_population: user[0].populationAppartenance,
        position: user[0].position,
        job: user[0].job,
      };
    }

    return userInfo;
  }
}
module.exports = UserDataCheck;
