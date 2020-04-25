package fr.omatech.ordernow.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.omatech.ordernow.web.rest.TestUtil;

public class FormulaOrderTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormulaOrder.class);
        FormulaOrder formulaOrder1 = new FormulaOrder();
        formulaOrder1.setId(1L);
        FormulaOrder formulaOrder2 = new FormulaOrder();
        formulaOrder2.setId(formulaOrder1.getId());
        assertThat(formulaOrder1).isEqualTo(formulaOrder2);
        formulaOrder2.setId(2L);
        assertThat(formulaOrder1).isNotEqualTo(formulaOrder2);
        formulaOrder1.setId(null);
        assertThat(formulaOrder1).isNotEqualTo(formulaOrder2);
    }
}
