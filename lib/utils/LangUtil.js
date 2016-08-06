/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace GTLib
 */
GTLib = GTLib || {};
/**
 * @namespace GTLib.LangUtil
 */
GTLib.LangUtil = GTLib.LangUtil || {};

GTLib.LangUtil.Language = {
    DE: 'de',
    EN: 'en',
    FR: 'fr',
    IT: 'it'
};

GTLib.LangUtil.Languages = [
    GTLib.LangUtil.Language.DE,
    GTLib.LangUtil.Language.EN,
    GTLib.LangUtil.Language.FR,
    GTLib.LangUtil.Language.IT
];

GTLib.LangUtil.lang = null;
GTLib.LangUtil.translationContent = null;
GTLib.LangUtil.translation = null;

/**
 * Validates a given language.
 * Returns true if the language is valid.
 *
 * @method GTLib.LangUtil#validateLanguage
 * @memberof GTLib.LangUtil
 * @static
 */
GTLib.LangUtil.validateLanguage = function (language)
{
    if (GTLib.LangUtil.Languages.indexOf(language) > -1)
    {
        return true;
    }
    return false;
};
/**
 * Sets the language of the application.
 *
 * @method GTLib.LangUtil#setLanguage
 * @memberof GTLib.LangUtil
 * @static
 */
GTLib.LangUtil.setLanguage = function (language)
{
    if (!GTLib.LangUtil.validateLanguage(language))
    {
        Log.info("Language '" + language + "' is not valid! Defaulting to '" + GTLib.LangUtil.Language.DE);
        language = GTLib.LangUtil.Language.DE;
    }

    GTLib.LangUtil.lang = language;

    Log.debug("Language is", GTLib.LangUtil.lang);
};
/**
 * Takes an array of language constants to set as valid languages for this game.
 *
 * @method GTLib.LangUtil#setValidLanguages
 * @memberof GTLib.LangUtil
 * @static
 */
GTLib.LangUtil.setValidLanguages = function (languages)
{
    GTLib.LangUtil.Languages = languages;
};
/**
 * Sets the full content for all translationContent.
 *
 * @method GTLib.LangUtil#setTranslationContent
 * @memberof GTLib.LangUtil
 * @static
 */
GTLib.LangUtil.setTranslationContent = function (content)
{
    if (!content)
    {
        throw new Error("Failed to set invalid translation content '" + content + "'!");
    }

    GTLib.LangUtil.translationContent = content;
};
/**
 * Returns the translation for a given token depending on the currently selected language.
 *
 * @method GTLib.LangUtil#getTranslation
 * @memberof GTLib.LangUtil
 * @static
 */
GTLib.LangUtil.getTranslation = function (token)
{
    //if (!GTLib.LangUtil.lang)
    //{
    //    throw new Error("Translation failed: Application language not set! Call setLanguage() first.");
    //}
    if (!GTLib.LangUtil.translation)
    {
        if (!GTLib.LangUtil.translationContent)
        {
            throw new Error("Invalid translation content! Call setTranslationContent() first.");
        }
        //if (!GTLib.LangUtil.translationContent.hasOwnProperty(GTLib.LangUtil.lang))
        //{
        //    throw new Error("No translation content for language '" + GTLib.LangUtil.lang + "' found!");
        //}
        // set translation data for currently set language
        GTLib.LangUtil.translation = GTLib.LangUtil.translationContent;//[GTLib.LangUtil.lang];
    }
    // extract strings depending on token
    var arr = token.split("-");
    var n = arr.length;
    var i;
    var obj = GTLib.LangUtil.translation;
    for (i = 0; i < n; i++)
    {
        if (!obj.hasOwnProperty(arr[i]))
        {
            Log.error("Translation object for sub token '" + arr[i] + "' of token '"+token+"' not found in language pack!");// '"+GTLib.LangUtil.lang+"'!");
            obj = "TNF_"+arr[i];
            break;
        }
        else
        {
            obj = obj[arr[i]];
        }

    }
    return obj;
};