class UserDataCheck {
  checkMandatoryData(user) {
    //console.log(user[0])
    if(
      user[0].nomDeNaissance === ''
      || user[0].nomDeNaissance === undefined
      || user[0].nomDeNaissance === null
      || typeof user[0].nomDeNaissance !== 'string'
    ) {
      return {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].departementDeNaissance,
        birthdepartement: user[0].departementDeNaissance,
        email: user[0].email,
        gender: user[0].Gender,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: 'Johny',
        phone_number: user[0].telephone,
        preferred_username: `${user[0].prenom}${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siret: user[0].siret,
      }
    }
    else if(
      user[0].prenom === ''
      || user[0].prenom === undefined
      || user[0].prenom === null
      || typeof user[0].prenom !== 'string'
    ) {
      return {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].departementDeNaissance,
        birthdepartement: user[0].departementDeNaissance,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        gender: user[0].Gender,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: 'Johny',
        phone_number: user[0].telephone,
        preferred_username: `${user[0].prenom}${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siret: user[0].siret,
      };
    }
    else if (
      user[0].birthdate === ''
      || user[0].birthdate === undefined
      || user[0].birthdate === null
      || typeof user[0].birthdate !== 'string'
    ) {
      return {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].departementDeNaissance,
        birthdepartement: user[0].departementDeNaissance,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        gender: user[0].Gender,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: 'Johny',
        phone_number: user[0].telephone,
        preferred_username: `${user[0].prenom}${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siret: user[0].siret,
      };
    }
    else if(
      user[0].departementDeNaissance === ''
      || user[0].departementDeNaissance === undefined
      || user[0].departementDeNaissance === null
      || typeof user[0].departementDeNaissance !== 'string'
    ) {
      return {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthdepartement: user[0].departementDeNaissance,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        gender: user[0].Gender,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: 'Johny',
        phone_number: user[0].telephone,
        preferred_username: `${user[0].prenom}${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siret: user[0].siret,
      };
    }
    else if(
      user[0].Gender === ''
      || user[0].Gender === undefined
      || user[0].Gender === null
      || typeof user[0].Gender !== 'string'
    ){
      return {
        address: {
          country: user[0].codePaysDeNaissance,
          formatted: user[0].adresseFormatee,
          street_address: user[0].adresseFormatee,
        },
        birthdate: user[0].birthdate,
        birthcountry: user[0].codePaysDeNaissance,
        birthplace: user[0].departementDeNaissance,
        birthdepartement: user[0].departementDeNaissance,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: 'Johny',
        phone_number: user[0].telephone,
        preferred_username: `${user[0].prenom}${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siret: user[0].siret
      };
    }
    else {
      return {
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
        birthplace: user[0].departementDeNaissance,
        birthdepartement: user[0].departementDeNaissance,
        email: user[0].email,
        family_name: user[0].nomDeNaissance,
        gender: user[0].Gender,
        given_name: user[0].prenom,
        middle_name: user[0].secondPrenom,
        name: `${user[0].nomDeNaissance} ${user[0].prenom}`,
        nickname: 'Johny',
        phone_number: user[0].telephone,
        preferred_username: `${user[0].prenom}${user[0].nomDeNaissance}`,
        updated_at: user[0].updatedAt,
        siret: user[0].siret,
      };
    }
  }
}
module.exports = UserDataCheck;
