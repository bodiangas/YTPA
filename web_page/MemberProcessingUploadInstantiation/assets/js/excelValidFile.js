
	
	document.write(
      unescape("%3Cscript src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E")
    );
	document.write(
      unescape("%3Cscript src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js' type='text/javascript'%3E%3C/script%3E")
    );
	
	document.write(
      unescape("%3Cscript src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js' type='text/javascript'%3E%3C/script%3E")
    );
   
        var columnSpec = [
            "Assureur",
            "Entite",
            "Nom",
            "Prenom",
            "Genre",
            "Filiation",
            "NumPolice",
            "NumReferent",
            "NumCarte",
            "RefCarte",
            "StatutCard",
            "DateNaissance",
            "DebutConverture",
            "FinCouverture",
            "Non_Cov_Date",
            "Langue"
        ];

        var headerCells = [...Array(columnSpec.length)].map((_, index) => {
            var headerCell = String.fromCharCode(index + 65) + '1';
            var value = columnSpec[index];
            return { key: headerCell, value: value }
        });

        let isWorkbookValid;

            computeFileAsync(readExcelFile, function (result) {
                isWorkbookValid = result;
                return isWorkbookValid;

            });



        function computeFileAsync(file, callback) {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onload = (event) => {
                let data = event.target.result;
                let workbook = XLSX.read(data, { type: "binary" });

                callback(checkWorkbookValidity(workbook));
            }
        }

        function checkWorkbookValidity(workbook) {
            var workbookValidity;
            workbook.SheetNames.forEach(sheet => {
                workbookValidity = headerCells.every(headerCell => {
                    let isheaderIncluded =
                        !!workbook.Sheets[sheet][headerCell.key] &&
                        workbook.Sheets[sheet][headerCell.key].v.toLowerCase() === headerCell.value.toLocaleLowerCase();

                    if (!isheaderIncluded) return false;
                    return true;
                })
            });
            return workbookValidity;
        }