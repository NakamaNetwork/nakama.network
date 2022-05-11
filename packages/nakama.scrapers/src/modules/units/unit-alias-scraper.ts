import { importFromRemote } from '../utils/import-helper';

interface SniffedAliases {
  aliases: Record<number, Array<string>>;
}

export const sniffAliases = async () => {
  const { aliases } = await importFromRemote<SniffedAliases>(
    'https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/data/aliases.js'
  );
  return aliases;
};
