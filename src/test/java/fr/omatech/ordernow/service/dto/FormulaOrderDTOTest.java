package fr.omatech.ordernow.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.omatech.ordernow.web.rest.TestUtil;

public class FormulaOrderDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormulaOrderDTO.class);
        FormulaOrderDTO formulaOrderDTO1 = new FormulaOrderDTO();
        formulaOrderDTO1.setId(1L);
        FormulaOrderDTO formulaOrderDTO2 = new FormulaOrderDTO();
        assertThat(formulaOrderDTO1).isNotEqualTo(formulaOrderDTO2);
        formulaOrderDTO2.setId(formulaOrderDTO1.getId());
        assertThat(formulaOrderDTO1).isEqualTo(formulaOrderDTO2);
        formulaOrderDTO2.setId(2L);
        assertThat(formulaOrderDTO1).isNotEqualTo(formulaOrderDTO2);
        formulaOrderDTO1.setId(null);
        assertThat(formulaOrderDTO1).isNotEqualTo(formulaOrderDTO2);
    }
}
